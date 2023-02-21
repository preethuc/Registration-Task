import express from "express";
import {
  register,
  login,
  logout,
  getAllData,
  removeUser,
  updateUser,
} from "./../controller/user-controller";
import upload from "./../utils/file-upload";
import {auth} from "./../auth-token/token-verify";
const router = express.Router();

router.post("/register",upload.single("image"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/all",getAllData);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",removeUser);

module.exports = router;
