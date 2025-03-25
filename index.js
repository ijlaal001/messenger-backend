const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const messages = [];

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.json({ message: "Username already exists" });
    }
    users.push({ username, password });
    res.json({ message: "Registration successful" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post("/send", (req, res) => {
    const { user, message } = req.body;
    messages.push({ user, message });
    res.json({ message: "Message sent" });
});

app.get("/messages", (req, res) => {
    res.json(messages);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
