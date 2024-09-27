// server/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Change this in production

app.use(cors());
app.use(bodyParser.json());

//Read users from file on server storage
const readUsersFromFile = () => {
  const data = fs.readFileSync("storage/users.json", "utf8");
  return JSON.parse(data);
};

const readDancersFromFile = () => {
  const data = fs.readFileSync("storage/dancers.json", "utf8");
  return JSON.parse(data);
};


//Write users from file on server storage
const writeUsersToFile = (users) => {
  fs.writeFileSync("storage/users.json", JSON.stringify(users, null, 2));
};

// Register a new user
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  let users = readUsersFromFile();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Cet email est déjà utilisé" });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).json({ message: "Utilisateur créé avec succès" });
});

// Login a user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  let users = readUsersFromFile();
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
  authenticate(res, email, token, () => {
    let users = readUsersFromFile();
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    users[userIndex] = { email: users[userIndex].email, username, password: users[userIndex].password };
    writeUsersToFile(users);
    let user = users[userIndex];
    res.status(200).json({ token, user });
  });
});

// Delete a user
app.delete("/api/user", (req, res) => {
  const { email } = req.query;
  const token = req.headers["authorization"];
  authenticate(res, email, token, () => {
    let users = readUsersFromFile();
    users = users.filter((user) => user.email !== email);
    writeUsersToFile(users);
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
  res.sendStatus(200).json({ message: "Test OK" });
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
