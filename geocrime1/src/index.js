const pontoRoutes = require("./routes/pontoRoutes")
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());
app.use("/pontos", pontoRoutes);

module.exports = app