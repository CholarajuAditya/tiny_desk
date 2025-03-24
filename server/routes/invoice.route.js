import express from "express";
const Router = express.Router();
import createInvoicePDF from "../controllers/invoice.controller.js";

Router.route("/").post(createInvoicePDF)

export default Router;
