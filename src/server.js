import app from "./app";
import mongoose from "mongoose";
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
mongoose.connection
  .once("open", () => {
    console.log("Database Connected");
  })
  .on("error", (error) => {
    console.log("error is :", error);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on the port of ${PORT}`);
});
