import mongoose, { Schema,models } from "mongoose";

const DoctorSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Contact: {
        type: String,
        required: true,
    },
    SpecialistAt: {
        type: String,
        required: true,
    },
    Hospital: {
        type: String,
        required: true,
    },
});

export default models.Doctor || mongoose.model("Doctor", DoctorSchema);