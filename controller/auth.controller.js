const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.authenticate = (req, res, next) => {
  try {
    // 토큰 읽어오기, 프론트엔드 어디에 토큰을 붙여서 보냈지? headers
    const tokenString = req.headers.authorization; // Bearea dsfjdskljglk
    if (!tokenString) {
      throw new Error("invaild token");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("invaild token");
      }
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = authController;
