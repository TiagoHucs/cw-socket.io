const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // serve arquivos da pasta public

io.on("connection", (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    socket.on("morse-press", () => {
        socket.broadcast.emit("morse-on");
    });

    socket.on("morse-release", () => {
        socket.broadcast.emit("morse-off");
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
