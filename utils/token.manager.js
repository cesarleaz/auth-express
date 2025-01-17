import jwt from "jsonwebtoken";
import { IS_PROD, JWT_REFRESH, JWT_SECRET, KV_REFRESH_TOKEN } from "../config.js";

export const tokenVerificationErrors = {
    "No Bearer": "Formato de token incorrecto", // Si no estructura bien antes del enviar!
    "invalid signature": "La firma del token no es válida",
    "jwt expired": "Token expirado",
    "invalid token": "Token no válido",
    "jwt malformed": "Toekn formato no válido",
};

export const generateToken = (uid) => {
    const expiresIn = 60 * 15; // 15 minutos

    try {
        const token = jwt.sign({ uid }, JWT_SECRET, { expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30; // 30 días

    try {
        const refreshToken = jwt.sign({ uid }, JWT_REFRESH, {
            expiresIn,
        });

        res.cookie(KV_REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: !IS_PROD,
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: "none",
        });
    } catch (error) {
        console.log(error);
    }
};
