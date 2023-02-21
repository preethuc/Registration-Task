import jwt from "jsonwebtoken";
require("dotenv").config();
export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Un Authenticated");
  } else {
    const token = req.headers.authorization.split("")[1];
    if (token === null) {
      return res.status(401).send("Un authorized");
    }
    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.status(401).send("access denied");
      }
      next();
    });
  }
};
