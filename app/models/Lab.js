
import mongoose, {Schema,models} from "mongoose";

const LabSchema = new Schema({
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
    Logo: {
        type: String,
    },
    Pathologist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

})

export default models.Lab || mongoose.model("Lab", LabSchema);