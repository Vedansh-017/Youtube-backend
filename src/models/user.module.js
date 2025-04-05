import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import e from "express";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: true,
        default: 'default.jpg',
    },
    coverImage: {
        type: String,
        default: 'default.jpg',
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
        default: null,
    },

}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id ,
            email: this.email,
            fullName: this.fullName,
            username: this.username,
        },
         process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY  || '1h'  
        }
    );  
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id ,
            email: this.email,
        },
         process.env.REFRESH_TOKEN_SECRET, 
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY  || '1h'  
        }
    );  
};

export const User = mongoose.model('User', userSchema);
 