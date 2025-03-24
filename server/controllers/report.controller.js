import Invoice from "../models/invoice.model.js";
import PO from "../models/po.model.js";
import mongoose from "mongoose";

const getReports = async (req, res) => {
        const { userId } = req.user;
        let { month, year } = req.query;

        const currentDate = new Date();
        year = year ? parseInt(year) : currentDate.getFullYear();
        month = month ? parseInt(month) : currentDate.getMonth() + 1;


        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1); 
    
        const invoices = await Invoice.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(userId),
                    createdAt: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount.total" }
                }
            }
        ]);

        const expenses = await PO.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(userId),
                    createdAt: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: "$total" }
                }
            }
        ]);

        const totalRevenue = invoices.length > 0 ? invoices[0].totalRevenue : 0;
        const totalExpenses = expenses.length > 0 ? expenses[0].totalExpenses : 0;
        const profit = totalRevenue - totalExpenses;
        
        res.status(200).json({
            month,
            year,
            totalRevenue,
            totalExpenses,
            profit
        });
};

export default getReports;
