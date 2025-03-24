import express from "express";
const Router = express.Router();
import create_PO_PDF from "../controllers/po.controller.js";

Router.route("/").post(create_PO_PDF)

export default Router;
