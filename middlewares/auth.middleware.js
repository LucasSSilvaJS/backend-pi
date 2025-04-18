import jwt from "jsonwebtoken";

export const authMiddleware = (...cargosPermitidos) => {
    if (process.env.DISABLE_AUTH === 'true') {
        return (req, res, next) => next();
    }
    
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token não fornecido" });
        }
    
        const token = authHeader.split(" ")[1];
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
            req.user = decoded;
    
            if (!cargosPermitidos.includes(req.user.cargo)) {
                return res.status(403).json({ error: "Acesso negado" });
            };
    
            next();
        } catch (err) {
            return res.status(401).json({ error: "Token inválido" });
        };
    };
};
