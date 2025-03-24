import express from "express"
const Router = express.Router()
import {registerUser} from "../controllers/register.controller.js"

Router.route("/").post(registerUser)

export default Router