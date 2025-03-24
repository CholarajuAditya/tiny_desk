// requires optimization

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function invoiceTemplate({ companyDetails, invoiceNo, billTo, deliveryTo, amount, products }) {
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
    const textWidth = timesRomanFont.widthOfTextAtSize("INVOICE", fontSizeBig);
    const rightSectionX = width - (textWidth + 100);
    const leftSectionX = 30;

    //company details
    page.drawText(`${companyDetails.name}`, {
        ...standardOption,
        x: leftSectionX,
        y: height - 50, //height - (font-size + top-margin) //margin: 30
        size: fontSizeBig,
        font: boldFont,
    });

    let companyDetailsArr = Object.values(companyDetails).slice(1);

    companyDetailsArr.forEach((text, index) => {
        page.drawText(`${text}`, {
            ...standardOption,
            x: leftSectionX,
            y: height - (70 + 20 * index),
        });
    });

    //invoice details
    page.drawText(`INVOICE`, {
        ...standardOption,
        font: boldFont,
        size: fontSizeBig,
        x: rightSectionX ,
        y: height - 50,
    });

    page.drawText(`Invoice #: ${invoiceNo}`, {
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

    //bill to
    page.drawText(`BILL TO:`, {
        ...standardOption,
        font: boldFont,
        x: leftSectionX,
        y: height - 170,
    });
    Object.values(billTo).forEach((text, index) => {
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


    //table
    const tableX = 30;
    const tableY = 500;
    const tableWidth = width - 60;
    const rowHeight = 25;
    const columnWidths = [
        tableWidth / 6,
        (tableWidth / 6) * 2,
        tableWidth / 6,
        tableWidth / 6,
        tableWidth / 6,
    ];

    const header = ["Sl No.", "DESCRIPTION", "QTY", "RATE", "TOTAL"];
    const rows = products.map((obj) => (
        Object.values(obj)
    ));

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

    //summary section
    const summaryX = (tableWidth / 6) * 5 - 40;
    const summaryY = tableY - rowHeight * (rows.length + 1) + 5;
    page.drawText(`SUBTOTAL`, {
        ...standardOption,
        font: boldFont,
        x: summaryX,
        y: summaryY,
    });
    page.drawText(`TAX`, {
        ...standardOption,
        font: boldFont,
        x: summaryX + 38,
        y: summaryY - rowHeight,
    });
    page.drawText(`TOTAL`, {
        ...standardOption,
        font: boldFont,
        x: summaryX + 23,
        y: summaryY - rowHeight * 2,
    });
    // rectangle for subtotal, tax, total
    for (let i = 0; i < 3; i++) {
        page.drawRectangle({
            x: summaryX + 70,
            y: summaryY - rowHeight * i - 5,
            width: tableWidth / 6,
            height: rowHeight,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
        });
    }

    Object.values(amount).forEach((amount, index) => {
        page.drawText(`${amount}`, {
            ...standardOption,
            x:
                summaryX +
                70 +
                (tableWidth / 6 -
                    timesRomanFont.widthOfTextAtSize(`${amount}`, fontSize)) /
                    2,
            y: summaryY - rowHeight * index - 5 + (rowHeight - fontSize) / 2,
        });
    });

    page.drawText(`Make all checks payable to ${companyDetails.name}`, {
        ...standardOption,
        x: 30,
        y: 180,
    });
    page.drawText(
        `If you have any questions concerning this invoice, contact ${companyDetails.phone}`,
        {
            ...standardOption,
            x: 30,
            y: 160,
        }
    );
    page.drawText(`THANK YOU FOR YOUR BUSINESS!`, {
        ...standardOption,
        font: boldFont,
        size: 16,
        x:
            (width -
                boldFont.widthOfTextAtSize(
                    `THANK YOU FOR YOUR BUSINESS!`,
                    16
                )) /
            2,
        y: 110,
    });
    return pdfDoc;
}

export default invoiceTemplate;
