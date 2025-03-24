import express from "express"
import "dotenv/config"
const app = express()
import cors from "cors"

app.use(express.json())
app.use(cors())


//routes
import { reportRouter, loginRouter, registerRouter, profileRouter, customerRouter, vendorRouter, invoiceRouter, poRouter } from "./routes/index.js"
import { auth } from "./utils/index.js"

app.use("/login", loginRouter)
app.use("/register", registerRouter)

app.use(auth)
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


app.use("/profile", profileRouter)
app.use("/customer", customerRouter)
app.use("/vendor", vendorRouter)
app.use("/invoice", invoiceRouter)
app.use("/po", poRouter)
app.use("/report", reportRouter)
//error handling
import { errorHandler } from "./utils/index.js"
app.use(errorHandler)

//DB connect
import {connectDB} from "./db/connectDB.js"
const port = process.env.PORT
app.listen(port, async() => {
    await connectDB(process.env.MONGO_URI)
    console.log(`server listening on ${port}`);
})


