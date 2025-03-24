import express from "express"
const Router = express.Router()
import {getCustomers, createCustomer, deleteCustomer, getCustomer, updateCustomer} from "../controllers/customer.controller.js"

Router.route("/").get(getCustomers).post(createCustomer)
Router.route("/:id").get(getCustomer).delete(deleteCustomer).patch(updateCustomer)

export default Router