import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // || req.user.role !== "admin"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};
