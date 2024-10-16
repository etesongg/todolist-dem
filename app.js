const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter); // /api/tasks -> url에 /api로 불리면 indexRouter로 감

const mongoURI = MONGODB_URI_PROD;
mongoose
  .connect(mongoURI, { useUnifiedTopology: true })
  .then(() => console.log(`mongoose connected`))
  .catch((err) => console.log(`db connection fail`, err));

app.listen(5001, () => {
  console.log(`server on 5001`);
});
