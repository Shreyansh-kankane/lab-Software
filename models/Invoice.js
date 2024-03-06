import mongoose,{Schema,models} from "mongoose";
import LabTest from "./LabTest";

const InvoiceSchema = new Schema({

    InvoiceNo: {
        type: String,
        required: true,
    },
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    Doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab',
        required: true,
    },
    Tests: {
        type: [LabTest.Schema],
        required: true,
    },
    TotalAmount: {
        type: Number,
        required: true,
    },
    Discount: {
        type: Number,
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
    Date: {
        type: Date,
        required: true,
    },
    PaymentDate: {
        type: Date,
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
    PrintedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

export default models.Invoice || mongoose.model("Invoice", InvoiceSchema);