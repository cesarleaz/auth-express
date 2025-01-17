import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/token.manager.js";
import { JWT_REFRESH, JWT_SECRET, KV_REFRESH_TOKEN } from "../config.js";

export const authorization = (req, res, next) => {
    try {
        const token = req.headers?.authorization;

        if (!token) throw new Error("No Bearer");

        const tokenTreaty = token.trim().replace(/^(Bearer|bearer)\ /, '');

        const { uid } = jwt.verify(tokenTreaty, JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};

export const requireRefreshToken = (req, res, next) => {
    try {
        const cookieToken = req.cookies[KV_REFRESH_TOKEN];
        if (!cookieToken) throw new Error("No existe el token");

        const { uid } = jwt.verify(cookieToken, JWT_REFRESH);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: tokenVerificationErrors[error.message] });
    }
};