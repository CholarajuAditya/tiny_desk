import PO_Template from "../utils/PO_Template.js";
import PO from "../models/po.model.js";
import { Profile } from "../models/profile.model.js";
import Counter from "../models/counter.model.js";
import { sendMail } from "../utils/mail.js";

const create_PO_PDF = async (req, res) => {
    const { userId } = req.user;
    const counter = await Counter.findOneAndUpdate(
        { createdBy: userId },
        { $inc: { poNo: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    req.body.total = Number(req.body.total);
    const response = await PO.create({
        poNo: counter.poNo,
        ...req.body,
        createdBy: userId,
    });
    const profile = await Profile.findOne({ createdBy: userId });
    if (!response || !profile) {
        return res.status(500).json({
            message: "error creating po or fetching company details",
        });
    }

    const {
        name,
        gstin,
        address: { city, pincode },
        phone,
    } = profile;
    const companyDetails = { name, gstin, city, pincode, phone };

    const PO_Doc = await PO_Template({
        companyDetails,
        ...req.body,
        poNo: counter.poNo,
    });
    const PO_Bytes = await PO_Doc.save();

    const attachment = {
        filename: `purchase_order_${counter.poNo}.pdf`,
        content: PO_Bytes,
        contentType: "application/pdf",
    };

    const html = `<p style="color: black; padding: 0; margin-bottom: 5px;">With respect to our recent agreement, please find the Purchase Order attached below</p>
                  <p style="color: black; padding: 0; ">incase of any discrepancies please contact us, <span style="font-weight: bold">ph: ${profile.phone}</span></p>`;

    const info = await sendMail(
        req.body.vendor.email,
        "Purchase Order",
        html,
        attachment
    );
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="purchase_order.pdf"'
    );

    if (!info) {
        return res.send("error sending email");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("messageid", info.messageId);
    res.send(Buffer.from(PO_Bytes));
};

export default create_PO_PDF;
