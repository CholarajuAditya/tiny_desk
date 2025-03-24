import express from "express"
const Router = express.Router()
import getReports from "../controllers/report.controller.js"

Router.route("/").get(getReports)

export default Router