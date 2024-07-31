import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  jwtKey: process.env.JWT_SECRET_KEY,
  frontendOrigin: process.env.FRONTEND_ORIGIN,
  mongoURL: process.env.DB_URL,
};

export const config = Object.freeze(_config);
