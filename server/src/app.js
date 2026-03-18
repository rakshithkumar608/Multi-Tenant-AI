const cors = require('cors');
const express = require('express');

const chatRoutes = require("./routes/chat.routes");
const authRoutes = require("./routes/auth.routes");


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

console.log("Routes loaded");
app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = app;