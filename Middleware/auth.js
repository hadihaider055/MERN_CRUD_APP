const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ err: "Invalid token" });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = auth;
