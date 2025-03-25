document.addEventListener("DOMContentLoaded", function() {
    // Your existing JavaScript code goes here
    
    const backendURL = "https://messenger-backend-sh73.onrender.com";

    // Register button event
    document.getElementById("registerBtn").addEventListener("click", function() {
        let username = document.getElementById("newUsername").value.trim();
        let password = document.getElementById("newPassword").value.trim();
        
        fetch(`${backendURL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }).then(response => response.json())
          .then(data => alert(data.message));
    });

    // Login button event
    document.getElementById("loginBtn").addEventListener("click", function() {
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        fetch(`${backendURL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  sessionStorage.setItem("currentUser", username);
                  document.getElementById("login").style.display = "none";
                  document.getElementById("register").style.display = "none";
                  document.getElementById("chat").style.display = "block";
                  loadMessages();
              } else {
                  alert("Invalid username or password");
              }
          });
    });

    // Switch to Register page
    document.getElementById("showRegister").addEventListener("click", function() {
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "block";
    });

    // Switch to Login page
    document.getElementById("showLogin").addEventListener("click", function() {
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "block";
    });

    // Load chat messages
    function loadMessages() {
        fetch(`${backendURL}/messages`)
            .then(response => response.json())
            .then(messages => {
                let chatbox = document.getElementById("chatbox");
                chatbox.innerHTML = "";
                messages.forEach(msg => {
                    let messageElement = document.createElement("div");
                    messageElement.className = msg.user === sessionStorage.getItem("currentUser") ? "message user" : "message other";
                    messageElement.textContent = msg.user + ": " + msg.message;
                    chatbox.appendChild(messageElement);
                });
                chatbox.scrollTop = chatbox.scrollHeight;
            });
    }

    // Send a message
    document.getElementById("send").addEventListener("click", function() {
        let messageInput = document.getElementById("message");
        let messageText = messageInput.value.trim();
        let currentUser = sessionStorage.getItem("currentUser");

        if (messageText !== "" && currentUser) {
            fetch(`${backendURL}/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: currentUser, message: messageText })
            }).then(response => response.json())
              .then(() => {
                  loadMessages();
                  messageInput.value = "";
              });
        }
    });

    // Logout button event
    document.getElementById("logout").addEventListener("click", function() {
        sessionStorage.removeItem("currentUser");
        document.getElementById("chat").style.display = "none";
        document.getElementById("login").style.display = "block";
    });
});
