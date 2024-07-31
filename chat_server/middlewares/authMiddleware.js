import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).send("User is not Authenticated!");
    }

    jwt.verify(token, config.jwtKey, async (err, payload) => {
      if (err) return res.status(403).send("Invalid JWT Token!");
      req.userId = payload.id;
      next();
    });
  } catch (error) {
    return res.status(400).send("Token is Invalid!");
  }
};

export default verifyJWT;
