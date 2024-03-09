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
    },
    Tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest',
    }],
    PRO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PRO',
    },
    Hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
    },
    Doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    Associate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ReferType: {
        type: String,
        enum: ['Self', 'Associate', 'Hospital', 'Doctor'],
    },

}, { timestamps: true }
)
mongoose.models = {};

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);