const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api.js");

// mongoose connection
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// listen for the connection to mongoose
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// parse data into json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP Request Logger
app.use(morgan("tiny"));

app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));
