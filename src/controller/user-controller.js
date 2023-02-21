import User from "./../model/user-model";
import bcrypt from "bcrypt";
// import tokenCreation from "./../auth-token/token-creation";
import jwt from "jsonwebtoken";
require("dotenv").config();
//Register
export const register = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        res.status(500).json({
          err: error,
        });
      } else {
        const data = new User({
          name: req.body.name,
          email: req.body.email,
          image: req.body.image,
          password: hash,
        });

        data.save();
        const payload = {
          name: data.name,
          id: data.id,
          email: data.email,
          password: data.password,
          image: data.image,
        };
        const token = jwt.sign(payload, process.env.SECRETKEY);
        token;
        if (req.file) {
          console.log(req.file);
          data.image = req.file.path;
        }
        res.status(201).json({
          status: "success",
          message: "Successfully registered",
          user_data: {
            name: data.name,
            email: data.email,
            image: data.image,
            token: token,
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.send("error occured");
  }
};

//LogIn
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "please enter the vaild password",
          });
        } else {
          const data = await User.findOneAndUpdate(
            { name: req.body.name },
            { logged_in: true },
            { new: true }
          );
          res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            data: data,
          });
        }
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send("error occured");
  }
};

//LogOut
export const logout = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { name: req.body.name },
      { logged_in: false },
      { new: true }
    );
    res.status(200).send("Logged out successfully");
  } catch (err) {
    console.log(err);
    return res.send("error occured");
  }
};

//GET - All Users
export const getAllData = async (req, res, next) => {
  try {
    const all_data = await User.find();
    return res.status(200).json({
      status: "success",
      results: all_data.length,
      message: "List of Users",
      data: all_data,
    });
  } catch (err) {
    console.log(err);
    return res.send("error occured");
  }
};

//PUT - Update User
export const updateUser = async (req, res, next) => {
  try {
    const update_data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: "success",
      message: "User Updated",
      data: update_data,
    });
  } catch (err) {
    console.log(err);
    return res.send("error occured");
  }
};

//DELETE - Delete User
export const removeUser = async (req, res, next) => {
  try {
    const remove_data = await User.findByIdAndUpdate(req.params.id);
    return res.status(204).json({
      status: "success",
      message: "User removed",
      data: remove_data,
    });
  } catch (err) {
    console.log(err);
    return res.send("error occured");
  }
};
