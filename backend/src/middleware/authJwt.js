import jwt from "jsonwebtoken";
import db from "../models/user.model.js";

const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: `No token provided` });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: `Unauthorised`, error: err });
    }

    req.userId = decoded._id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role" });
    }
  } catch (error) {
    res.status(500).send({ message: "Unable to validate admin role" });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};

export default authJwt;
