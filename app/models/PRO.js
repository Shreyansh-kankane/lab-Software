import mongoose, { Schema,models } from "mongoose";

const PROSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    MobileNo: {
        type: String,
        required: true,
    }
},
{timestamps: true}
);

export default models.PRO || mongoose.model("PRO", PROSchema);