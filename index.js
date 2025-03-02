const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

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
server.listen(3000, () => console.log(`server started at port 3000`));
