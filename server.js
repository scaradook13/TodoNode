const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

const taskRoutes = require("./routes/TaskRoute");
const UserRoutes = require("./routes/UserRoute");
const cookieParser = require("cookie-parser");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/", taskRoutes);
app.use("/", UserRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/Auth", {})
  .then(() => console.log("Database Connection Success!"));

app.listen(port, () => {
  console.log("Server is running in port 3000");
});