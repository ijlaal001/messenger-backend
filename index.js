const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = [{ username: "admin", password: "admin123", isAdmin: true }];
const messages = [];

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.json({ message: "Username already exists" });
    }
    users.push({ username, password, isAdmin: false });
    res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, isAdmin: user.isAdmin });
    } else {
        res.json({ success: false });
    }
});

app.get("/messages", (req, res) => {
    res.json(messages);
});

app.post("/send", (req, res) => {
    const { user, message } = req.body;
    messages.push({ user, message });
    res.json({ success: true });
});

// Admin route to change username and password
app.post("/admin/update-user", (req, res) => {
    const { adminUser, adminPass, targetUser, newUsername, newPassword } = req.body;
    const admin = users.find(u => u.username === adminUser && u.password === adminPass && u.isAdmin);
    if (!admin) {
        return res.json({ success: false, message: "Unauthorized" });
    }
    let user = users.find(u => u.username === targetUser);
    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }
    if (newUsername) user.username = newUsername;
    if (newPassword) user.password = newPassword;
    res.json({ success: true, message: "User updated successfully" });
});

app.listen(10000, () => console.log("Server running on port 10000"));
