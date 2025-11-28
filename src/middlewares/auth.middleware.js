import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1]; // 'Bearer TOKEN'

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.status(403).json({ message: "Invalid or expired token" });

      req.user = decoded; // Guardamos los datos del usuario en req.user
      next(); // Continúa a la siguiente función
    });
  } catch (error) {
    res.status(500).json({ message: "Auth error", details: error.message });
  }
};
