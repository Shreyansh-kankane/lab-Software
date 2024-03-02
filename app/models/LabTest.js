import mongoose,{Schema} from "mongoose";

const LabTestSchema = new Schema({
    TestName: {
        type: String,
        required: true,
    },
    TestCode: {
        type: Number,
        unique: true,
        required: true
    },
    Price: {
        type: Number,
        required: true,
    },
    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab',
        required: true
    },
    Hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    Available: {
        type: Boolean,
        default: true
    },
    Status: {
        type: String,
        enum: ['Active', 'Blocked'],
        default: 'Active'
    },
    NormalRange: {
        type: String,
        default: null
    },
    Value: {
        type: String,
        enum: ['Numeric', 'Template', 'Free Writing', 'Yes/No' ],
    },
})

export default  mongoose.models.LabTest || mongoose.model("LabTest", LabTestSchema);