import mongoose, {Schema} from 'mongoose';

const PatientSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    RegisteredBy: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        default: null
    },
    MobileNo: {
        type: String,
    },
    Address: {
        type: String,
    },
    City: {
        type: String,
    },
    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab',
        default: null
    },
    PRO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PRO',
        default: null
    },
    Hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        default: null
    },
    Doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        default: null
    },
    Associate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    ReferType: {
        type: String,
        enum: ['Self', 'Associate', 'Hospital', 'Doctor'],
    },
}, { timestamps: true }
)
mongoose.models = {};

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);