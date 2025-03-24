import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function PO_Template({ companyDetails, vendor, poNo, deliveryTo, products, total }) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontSize = 12;
    const fontSizeBig = 20;
    const standardOption = {
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    };
    const { height, width } = page.getSize();
    const textWidth = boldFont.widthOfTextAtSize("PURCHASE ORDER", fontSizeBig);
    const rightSectionX = width - (textWidth + 70);
    const leftSectionX = 30;

    // Seller Details
    page.drawText(`${companyDetails.name}`, {
        ...standardOption,
        x: leftSectionX,
        y: height - 50,
        size: fontSizeBig,
        font: boldFont,
    });

    let companyDetailsDetailsArr = Object.values(companyDetails).slice(1);
    companyDetailsDetailsArr.forEach((text, index) => {
        page.drawText(`${text}`, {
            ...standardOption,
            x: leftSectionX,
            y: height - (70 + 20 * index),
        });
    });

    // PO Header
    page.drawText(`PURCHASE ORDER`, {
        ...standardOption,
        font: boldFont,
        size: fontSizeBig,
        x: rightSectionX,
        y: height - 50,
    });

    page.drawText(`PO Number: ${poNo}`, {
        ...standardOption,
        x: rightSectionX,
        y: height - 70,
    });

    const d = new Date();
    const curDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    page.drawText(`Date: ${curDate}`, {
        ...standardOption,
        x: rightSectionX,
        y: height - 90,
    });

    // Buyer Details
    page.drawText(`Vendor:`, {
        ...standardOption,
        font: boldFont,
        x: leftSectionX,
        y: height - 170,
    });

    Object.values(vendor).forEach((text, index) => {
        page.drawText(`${text}`, {
            ...standardOption,
            x: leftSectionX,
            y: height - (190 + 20 * index),
        });
    });

    // Delivery Details
    page.drawText(`DELIVERY DETAILS:`, {
        ...standardOption,
        font: boldFont,
        x: rightSectionX,
        y: height - 170,
    });

    Object.values(deliveryTo).forEach((text, index) => {
        page.drawText(`${text}`, {
            ...standardOption,
            x: rightSectionX,
            y: height - (190 + 20 * index),
        });
    });

    // Table Headers
    const tableX = 30;
    const tableY = 500;
    const tableWidth = width - 60;
    const rowHeight = 25;
    const columnWidths = [
        tableWidth / 6, // Sl No.
        (tableWidth / 6) * 2, // Description
        tableWidth / 6, // Quantity
        tableWidth / 6, // Unit Price
        tableWidth / 6, // Total
    ];

    const header = ["Sl No.", "DESCRIPTION", "QTY", "UNIT PRICE", "TOTAL"];
    const rows = products.map((obj) => Object.values(obj));

    let currentY = tableY;

    // Draw Table Header
    drawRow(header, currentY, boldFont);

    // Draw Rows
    for (const row of rows) {
        currentY -= rowHeight;
        drawRow(row, currentY, timesRomanFont);
    }

    // Function to Draw Rows
    function drawRow(row, y, font) {
        let currentX = tableX;

        for (let i = 0; i < row.length; i++) {
            const text = row[i];
            const columnWidth = columnWidths[i];
            const textWidth = font.widthOfTextAtSize(text, fontSize);

            const textX = currentX + (columnWidth - textWidth) / 2;
            const textY = y + (rowHeight - fontSize) / 2;

            page.drawText(text, {
                x: textX,
                y: textY,
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
            });

            page.drawRectangle({
                x: currentX,
                y: y,
                width: columnWidth,
                height: rowHeight,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });

            currentX += columnWidth;
        }
    }

    // Summary Section
    const summaryX = (tableWidth / 6) * 5 - 40;
    const summaryY = tableY - rowHeight * (rows.length + 1) + 5;
    page.drawText(`TOTAL`, {
        ...standardOption,
        font: boldFont,
        x: summaryX,
        y: summaryY,
    });

    // Rectangle for total amount
    page.drawRectangle({
        x: summaryX + 70,
        y: summaryY - 5,
        width: tableWidth / 6,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    page.drawText(`${total}`, {
        ...standardOption,
        x:
            summaryX +
            70 +
            (tableWidth / 6 - timesRomanFont.widthOfTextAtSize(`${total}`, fontSize)) /
                2,
        y: summaryY - 5 + (rowHeight - fontSize) / 2,
    });

    // Notes Section
    page.drawText(`Please confirm receipt of this Purchase Order.`, {
        ...standardOption,
        x: 30,
        y: 180,
    });

    page.drawText(`For any queries, contact ${companyDetails.phone}.`, {
        ...standardOption,
        x: 30,
        y: 160,
    });

    page.drawText(`THANK YOU FOR YOUR BUSINESS!`, {
        ...standardOption,
        font: boldFont,
        size: 16,
        x:
            (width - boldFont.widthOfTextAtSize(`THANK YOU FOR YOUR BUSINESS!`, 16)) /
            2,
        y: 110,
    });

    return pdfDoc;
}

export default PO_Template;
