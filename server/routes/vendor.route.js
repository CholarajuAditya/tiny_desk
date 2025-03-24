import express from "express"
const Router = express.Router()
import { getVendors, createVendor, getVendor, deleteVendor, updateVendor } from "../controllers/vendor.controller.js"

Router.route("/").get(getVendors).post(createVendor)
Router.route("/:id").get(getVendor).delete(deleteVendor).patch(updateVendor)

export default Router