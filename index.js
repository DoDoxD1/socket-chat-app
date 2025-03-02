require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);
  socket.on("sendMessage", (msg) => {
    io.emit("message", msg);
  });
});

app.use(express.static("./public"));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
server.listen(PORT, () => console.log(`server started at port 3000`));
