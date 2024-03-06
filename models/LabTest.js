import mongoose,{Schema} from "mongoose";

const labtest = new Schema({
    Name: {
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
    LabName: {
        type: String,
        required: true,
    },
    Hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
    },
    Available: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'Yes',
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
    Type: {
        type: String,
        enum: ['Numeric', 'Template', 'Free Writing', 'Yes/No' ],
    },
})

mongoose.models = {};

export default mongoose.model.LabTest || mongoose.model("LabTest", labtest);