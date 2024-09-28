// server/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { sql } = require('@vercel/postgres');

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Change this in production

app.use(cors());
app.use(bodyParser.json());


const usersFilePath = path.join(__dirname, 'storage', 'users.json');
const dancersFilePath = path.join(__dirname, 'storage', 'dancers.json');

async function getUsersList() {
  if(process.env.NODE_ENV === "production") {
    return await sql`SELECT * FROM users`;
  }else{
    return readUsersFromFile();
  }
}
//Read users from file on server storage
const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, "utf8");
  console.log(data);
  return JSON.parse(data);
};

//Write users from file on server storage
const writeUsersToFile = async (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const readDancersFromFile = () => {
  const data = fs.readFileSync(dancersFilePath, "utf8");
  return JSON.parse(data);
};

// Register a new user
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  let users = await getUsersList();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Cet email est déjà utilisé" });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  if(process.env.NODE_ENV === "production") {
    sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`; 
  }else{
    await writeUsersToFile(users);

  }
  
  res.status(201).json({ message: "Utilisateur créé avec succès" });
});

// Login a user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  let users = await getUsersList();
  console.log('login',users);
  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(200).json({ token, user });
});

// Update a user
app.put("/api/user", (req, res) => {
  const { email , username} = req.body;
  const token = req.headers["authorization"];
  authenticate(res, email, token, async () => {
    let users = await getUsersList();
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    users[userIndex] = { email: users[userIndex].email, username, password: users[userIndex].password };

    if(process.env.NODE_ENV === "production"){
      await sql`UPDATE users SET username = ${username} WHERE email = ${email}`;
    }else{
      await writeUsersToFile(users);
    }
    let user = users[userIndex];
    res.status(200).json({ token, user });
  });
});

// Delete a user
app.delete("/api/user", (req, res) => {
  const { email } = req.query;
  const token = req.headers["authorization"];
  authenticate(res, email, token, async () => {
    let users = await getUsersList();
    users = users.filter((user) => user.email !== email);

    if(process.env.NODE_ENV === "production"){
      await sql`DELETE FROM users WHERE email = ${email}`;
    }else{
      await writeUsersToFile(users);
    }
    res.sendStatus(204);
  });
});

// Check if token is valid
app.get("/api/user", (req, res) => {
  const { email } = req.query;
  const token = req.headers["authorization"];
  authenticate(res, email, token, () => {
    res.sendStatus(204);
  });
});

// Get dancers list
app.get("/api/dancers", (req, res) => {
  const { email } = req.query;
  const token = req.headers["authorization"];
  authenticate(res, email, token, () => {
    let dancers = readDancersFromFile();
    res.status(200).json({ dancers });
  });
});

app.get("/api/test", (req, res) => {
  res.sendStatus(200).json({ message: "Test OK !" });
});

// Middleware d'authentification
const authenticate = (res, email, token, next) => {
  if (!token) return res.sendStatus(403);
  //remove "Bearer " from token
  jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    decoded = decoded.email;
    if (decoded !== email) return res.sendStatus(403);
    next();
  });
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
