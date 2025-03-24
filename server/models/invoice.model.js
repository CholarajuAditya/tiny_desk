import mongoose from "mongoose"


const invoiceSchema = mongoose.Schema(
    {
        invoiceNo: {
            type: String,
            required: [true, "cannot raise an invoice without invoice number"]
        },
        billTo: {
            name: { type: String, required: true },
            gstin: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: String, required: true },
            phone: { type: String, required: true }
        },
        deliveryTo: {
            address: {type: String, required: true}
        },
        products: {
            type: [
                {   
                    id: String,
                    name: String,
                    quantity: String,
                    price: String,
                    total: String
                }
            ],
            required: [true, "Products are required"],
            validate: {
                validator: (products) => products.length > 0,
                message: "At least one product is required"
            }
        },
        amount: {
            type: {
                subTotal: String,
                tax: String,
                total: Number,
            },
            required: [true, "amount is required"]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true}
)

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice