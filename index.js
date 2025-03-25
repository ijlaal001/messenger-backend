const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 10000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let messages = [];

// Register Endpoint
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.json({ message: "Username already exists!" });
    }
    users.push({ username, password });
    res.json({ message: "User registered successfully!" });
});

// Login Endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Invalid username or password!" });
    }
});

// Get Messages Endpoint
app.get("/messages", (req, res) => {
    res.json(messages);
});

// Send Message Endpoint
app.post("/send", (req, res) => {
    const { user, message } = req.body;
    if (!user || !message) {
        return res.json({ message: "Invalid message!" });
    }
    messages.push({ user, message });
    res.json({ message: "Message sent!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
