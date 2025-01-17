import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    // username: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     lowercase: true,
    //     index: { unique: true },
    // },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    return await bcryptjs.compare(canditatePassword, this.password);
};

export const User = model("User", userSchema);
