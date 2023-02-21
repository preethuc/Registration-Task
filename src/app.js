import express from "express";
import morgan from "morgan";
import userRoute from "./route/user-route";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Middleware is working");
  next();
});
app.use("/api/user/", userRoute);
module.exports = app;
