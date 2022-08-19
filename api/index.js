const express = require('express');
const cors = require("cors");

require('dotenv').config();
const app = express();

const routes = require('./src/routes');
const serverPort = process.env.API_SERVER_PORT || 3030;
const serverHost = process.env.API_SERVER_HOST || 'localhost';

var corsOptions = {
  origin: `http://${serverHost}:${serverPort}`
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const db = require("./src/models");

// sync database
db.sequelize.sync({
  force: true
}).then(() => {
  console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todolist application." });
});

app.listen(serverPort, () => {
    console.log('Server running!');
});
