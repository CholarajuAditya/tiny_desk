import mongoose from "mongoose"

const counterSchema = mongoose.Schema(
    {
        invoiceNo:{
            type: Number,
            default: 0
        },
        poNo:{
            type: Number,
            default: 0
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true, 
        },
    }
)

const Counter =  mongoose.model("Counter", counterSchema)

export default Counter