import {Schema, model} from "mongoose";

const User = new Schema({
        email: {
            type: String,
            unique: true,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        rememberMe: {
            type: Boolean,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required:true
        },
        avatar: {
            type: String
        },
        token: {
            type: String,
        },
        tokenDeathTime: {
            type: Number,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordTokenDeathTime: {
            type: Number,
        }
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    })

module.exports = model('User', User)