import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://depositphotos.com/vector/male-avatar-profile-picture-vector-119675554.html"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;