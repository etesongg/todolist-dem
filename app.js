const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();
app.use(bodyParser.json());
app.use("/api", indexRouter); // /api/tasks -> url에 /api로 불리면 indexRouter로 감
const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true }) // 구버전 url을 사용하더라도 연결이 잘 되게 설정
  .then(() => console.log(`mongoose connected`))
  .catch((err) => console.log(`db connection fail`, err));

app.listen(5001, () => {
  console.log(`server on 5001`);
});
