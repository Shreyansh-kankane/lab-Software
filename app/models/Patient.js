import mongoose, {Schema} from 'mongoose';

const PatientSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    MobileNo: {
        type: String,
        required: true,
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
    RegisteredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
}, { timestamps: true }
)

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);