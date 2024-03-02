
import mongoose, {Schema,models} from "mongoose";

const HospitalSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Contact: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
})

export default models.Hospital || mongoose.model("Hospital", HospitalSchema);