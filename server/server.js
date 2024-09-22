// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // Change this in production

app.use(cors());
app.use(bodyParser.json());

//Read users from file on server storage
const readUsersFromFile = () => {
    const data = fs.readFileSync('storage/users.json', 'utf8');
    return JSON.parse(data);
};

//Write users from file on server storage
const writeUsersToFile = (users) => {
    fs.writeFileSync('storage/users.json', JSON.stringify(users, null, 2));
};

// Register a new user
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    let users = readUsersFromFile();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    
    const newUser = { username, email, password };
    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
});

// Login a user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
   
    let users = readUsersFromFile();
    const user = users.find(user => user.email === email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, user });
});

// Middleware d'authentification
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
