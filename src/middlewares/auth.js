import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        // 1. Get token from request header
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user ID to request object
        req.user = decoded.id;

        // 4. Continue to route
        next();

    } catch (err) {
        console.log("JWT Error:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};


