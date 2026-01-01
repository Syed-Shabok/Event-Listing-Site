import authConfigs from "../config/auth.config.js";

export const validateUser = (req, res, next) => {
  let token = req.cookies["user-token"]; // existing cookie check

  // fallback to Authorization header
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  const decoded = authConfigs.decodeToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  req.user = {
    _id: decoded.id,
    email: decoded.email,
  };

  next();
};
