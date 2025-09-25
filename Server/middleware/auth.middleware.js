import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token invalid",
      error: error.message
    });
  }
};
