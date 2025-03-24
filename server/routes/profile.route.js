import express from "express"
const Router = express.Router()
import { createProfile, getProfile } from "../controllers/profile.controller.js"

Router.route("/").post(createProfile).get(getProfile)

export default Router