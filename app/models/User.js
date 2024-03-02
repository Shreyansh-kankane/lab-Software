import mongoose, { Schema,models } from "mongoose";

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Contact: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        enum: ["ADMIN", "DOCTOR", "RECEPTIONIST","PRO","ASSOCIATE"],
        default: "RECEPTIONIST",
    },
},{timestamps: true});

export default models.User || mongoose.model("User", UserSchema);