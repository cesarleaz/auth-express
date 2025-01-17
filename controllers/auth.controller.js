import { KV_REFRESH_TOKEN } from "../config.js";
import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/token.manager.js";

export const signUp = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) throw { code: 11000 };

        user = new User({ fullname, email, password });
        await user.save();

        // Generar el token JWT
        const { token, expiresIn } = generateToken(user._id);
        generateRefreshToken(user._id, res);

        return res.status(201).json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        // Alternativa por defecto mongoose
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya existe este usuario" });
        }
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user)
            return res.status(403).json({ error: "No existe este usuario" });

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });

        // Generar el token JWT
        const { token, expiresIn } = generateToken(user._id);
        generateRefreshToken(user._id, res);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const signOut = (req, res) => {
    res.clearCookie(KV_REFRESH_TOKEN);
    res.json({ ok: true });
};

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({
            fullname: user.fullname,
            email: user.email,
            uid: user._id
        });
    } catch (error) {
        return res.status(500).json({ error: "error de server" });
    }
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};
