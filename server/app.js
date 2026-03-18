const cors = require('cors');
const express = require('express');

const chatRoutes = require("./src/routes/chat.routes");
const authRoutes = require("./src/routes/auth.routes");
const uploadRoutes = require("./src/routes/upload.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
console.log("UPLOAD ROUTES LOADED");

app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("Server working");
});
module.exports = app;