# Tiny Desk

Tiny Desk is a **mini-ERP (Enterprise Resource Planning)** web application focused on helping small to medium businesses in their day-to-day operations.

## Core Features

### Customer Profile

-   Stores all essential info about the customer (GSTIN, email, phone, etc.)
-   Keeps track of frequent customers’ transactions individually
-   Easy to raise invoices using saved customer profiles

### Vendor Profile

-   Stores all essential info about the vendor (GSTIN, email, phone, etc.)
-   Keeps track of vendors’ (suppliers) transactions individually
-   Easy to raise purchase orders (POs) using saved vendor profiles

### Invoice

-   Acts as a proof of sale and legal document with seller and buyer details, amount, and terms
-   Serves as a reference for both customer and business for tax purposes

### Purchase Order

-   A commercial document used by the business (buyer) to formally request goods/services from a vendor (seller) at a mutually agreed price

### Financials

-   Tracks profits, turnover (total sales), and expenditure on a monthly basis

### Mailing of Invoice or PO

-   Automatically mails the PDF of the invoice or purchase order using customer/vendor profile details

### Standalone Invoice or PO Generation

-   Allows manual entry of customer/vendor details for generating invoices and POs without saved profiles

---

## Tech Stack Used (MERN)

-   [React](https://react.dev/) (Frontend)

-   [Node.js](https://nodejs.org/en) & [Express.js](https://expressjs.com/) (Backend)

-   [MongoDB](https://www.mongodb.com/) (Database) hosted using [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

-   [Mongoose](https://mongoosejs.com/) (ODM tool)

### Libraries Used

#### Frontend

-   [TailwindCSS](https://tailwindcss.com/): CSS framework for styling web pages
-   [react-router-dom](https://www.npmjs.com/package/react-router-dom): Routing and navigation in React apps
-   [Axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for Node.js and the browser

#### Backend

-   [nodemailer](https://www.npmjs.com/package/nodemailer): For sending emails from the server
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JWT authentication
-   [pdf-lib](https://www.npmjs.com/package/pdf-lib?activeTab=dependencies): PDF generation for invoices and POs
-   [cors](https://www.npmjs.com/package/cors): Whitelisting client URLs to access the server
-   [bcryptjs](https://www.npmjs.com/package/bcryptjs): Password encryption and decryption
-   [dotenv](https://www.npmjs.com/package/dotenv): Setting up environment variables
-   [express-async-errors](https://www.npmjs.com/package/express-async-errors): Eliminates the need for try/catch blocks in async functions by using a global error handler

---

## How to Install

You can install the project from GitHub in two ways:

1. **Download as a ZIP**

    - Go to the [GitHub repository](https://github.com/CholarajuAditya/tiny_desk)
    - Click on the **Code** button and choose **Download ZIP**

2. **Clone using Git**

    - open the folder you wish to download the project in the terminal
    - Run the following command in your terminal:

        ```bash
        git clone https://github.com/CholarajuAditya/tiny_desk.git
        ```

---

## Set Up

-   Setup .env files both in the root of client and server folder
-   this project uses environment variables to access database, email etc.

### Client .env Setup

```env
VITE_BACKEND_URL=your_server_url
```

-   VITE_BACKEND_URL helps to connect the frontend to your backend server.
-   env variable is used to not disclose the server address.
-   during development use the localhost url on which the server is running.

### server .env Setup

```env
MONGO_URI=mongoose_URI
ACCESS_TOKEN_SECRET=access_token
EMAIL=your_email
PASSWORD=email_password
```

-   MONGO_URI specifies the server your database URI, create a URI using mongoDB Atlas.
-   ACCESS_TOKEN_SECRET is used by JWT for Authentication
-   EMAIL is the email id used by the server to send the Invoice and PO emails on your behalf, use a gmail id as the server's mail utility is based on google's SMTP server
-   PASSWORD is the app password for the email id given above,You can refer a tutorial on how to create an app password

---

## How To Use

### Client

use the following command in your terminal

```bash
npm run dev
```

### Server

use the following command in your terminal

```bash
npm run start
```

<br>
Both the run commands can be changed in the package.json files of client and server respectively. <br>
Preferably install the nodemon library as a dev dependency in you server, to automatically restart the server when changes are saved.
