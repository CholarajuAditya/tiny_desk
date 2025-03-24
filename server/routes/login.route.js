import express from "express"
const Router = express.Router()
import {confirmLogin} from "../controllers/login.controller.js"

Router.route("/").post(confirmLogin)

export default Router