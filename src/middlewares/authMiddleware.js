const jwt = require("jsonwebtoken");
const connection = require("../config/db");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await connection.execute("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user[0]; // Attach user object
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateUser;
