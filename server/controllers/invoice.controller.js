import invoiceTemplate from "../utils/invoiceTemplate.js";
import { Profile } from "../models/profile.model.js";
import Invoice from "../models/invoice.model.js";
import Counter from "../models/counter.model.js";
import { sendMail } from "../utils/mail.js";

const createInvoicePDF = async (req, res) => {
    const { userId } = req.user;
    const counter = await Counter.findOneAndUpdate(
        { createdBy: userId },
        { $inc: { invoiceNo: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    req.body.amount.total = Number(req.body.amount.total);
    const response = await Invoice.create({
        invoiceNo: counter.invoiceNo,
        ...req.body,
        createdBy: userId,
    });
    const profile = await Profile.findOne({ createdBy: userId });
    if (!response || !profile) {
        return res.status(500).json({
            message: "error creating invoice or fetching company details",
        });
    }

    const {
        name,
        gstin,
        address: { city, pincode },
        phone,
    } = profile;
    const companyDetails = { name, gstin, city, pincode, phone };

    let data = { companyDetails, ...req.body, invoiceNo: counter.invoiceNo };

    const pdfDoc = await invoiceTemplate(data);
    const pdfBytes = await pdfDoc.save();

    const attachment = {
        filename: `Invoice_${counter.invoiceNo}.pdf`,
        content: pdfBytes,
        contentType: "application/pdf",
    };
    const html = `<p style="color: black; padding: 0; margin-bottom: 5px;">With respect to our recent transaction, please find the Invoice attached below</p>
                  <p style="color: black; padding: 0; ">incase of any discrepancies please contact us, <span style="font-weight: bold">ph: ${profile.phone}</span></p>`;
    const info = await sendMail(
        req.body.billTo.email,
        "Invoice",
        html,
        attachment
    );
    if (!info) {
        return res.send("error sending email");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
    res.setHeader("messageid", info.messageId);
    res.send(Buffer.from(pdfBytes));
};

export default createInvoicePDF;
