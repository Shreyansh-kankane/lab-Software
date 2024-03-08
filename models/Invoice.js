import mongoose,{Schema,models} from "mongoose";

const InvoiceSchema = new Schema({
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    Tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest',
        required: true,
    }],
    TotalAmount: {
        type: Number,
        required: true,
    },
    PaidAmount: {
        type: Number,
        required: true,
    },
    DueAmount: {
        type: Number,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    PrintedBy: {
        type: String,
        required: true,
    },
    Discount: {
        type: Number,
    },
    PaymentDate: {
        type: Date,
        default: Date.now,
    },
    PaymentMode: {
        type: String,
        enum: ['Cash', 'Card', 'Cheque', 'Online'],
    },
    PaymentReference: {
        type: String,
    },
    PaymentStatus: {
        type: String,
    },
    Remarks: {
        type: String,
    },

}, { timestamps: true })

export default models.Invoice || mongoose.model("Invoice", InvoiceSchema);