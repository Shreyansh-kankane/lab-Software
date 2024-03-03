import mongoose,{Schema,models} from "mongoose";

const GroupTestSchema = new Schema({
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
    Available: {
        type: Boolean,
        default: true
    },
    Status: {
        type: String,
        enum: ['Active', 'Blocked'],
        default: 'Active'
    },
})

export default models.GroupTest || mongoose.model("GroupTest", GroupTestSchema);