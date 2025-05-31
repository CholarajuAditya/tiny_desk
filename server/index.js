import express from "express";
import "dotenv/config";
const app = express();
import cors from "cors";

app.use(express.json());
const allowedOrigins = [
    "https://tiny-desk.vercel.app",
    "http://localhost:5173",
];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        exposedHeaders: ["messageid"],
    })
);

//routes
import {
    reportRouter,
    loginRouter,
    registerRouter,
    profileRouter,
    customerRouter,
    vendorRouter,
    invoiceRouter,
    poRouter,
} from "./routes/index.js";

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

//preflight cors issue
app.options(
    "*",
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

import { auth } from "./utils/index.js";

app.use(auth);
// import Customer from "./models/customer.model.js"
// import data2 from "./data/customer.js"
// import Vendor from "./models/vendor.model.js"
// import data from "./data/vendor.js"
// async function createUsers(){
//     const user = "67c72adcfdeb22b3cec0e271"
//     data2.forEach(ele => {
//         ele.createdBy = user
//     });
//     const result = await Customer.insertMany(data2)
//     if(result)
//         return console.log("vendors created");
//     console.log("customer creation failed");
// }
// createUsers()

app.use("/api/profile", profileRouter);
app.use("/api/customer", customerRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/po", poRouter);
app.use("/api/report", reportRouter);
//error handling
import { errorHandler } from "./utils/index.js";
app.use(errorHandler);

//DB connect
import { connectDB } from "./db/connectDB.js";
const port = process.env.PORT || 5000;
async function startServer() {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, "0.0.0.0", () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to DB:", error);
        process.exit(1);
    }
}

startServer();
