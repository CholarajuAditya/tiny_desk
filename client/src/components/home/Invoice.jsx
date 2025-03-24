import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

function Invoice() {
    const location = useLocation()
    const customer = location.state?.contact

    const [invoiceData, setInvoiceData] = useState({
        billTo: {
            name: "",
            gstin: "",
            city: "",
            pincode: "",
            phone: "",
        },
        deliveryTo: {
            address: "",
        },
        products: [
            { id: "1", name: "", quantity: "", price: "", total: "" },
        ],
        amount: { subTotal: "", tax: "", total: "" },
    });

    useEffect(() => {
        if(customer){
            setInvoiceData((prevData) => ({
                ...prevData,
                billTo: {
                    name: customer.name || "",
                    gstin: customer.gstin || "",
                    city: customer.address?.city || "",
                    pincode: customer.address?.pincode || "",
                    phone: customer.phone || "",
                }
            }));
        }  else {
            setInvoiceData((prevData) => ({
                ...prevData,
                billTo: {
                    name: "",
                    gstin: "",
                    city: "",
                    pincode: "",
                    phone: "",
                }
            }));
        }
    }, [customer]);
    
    const handleChange = (e, section, key) => {
        const { value } = e.target;
        setInvoiceData((prevData) => {
            if (section === "amount" && key === "tax") {
                const newTax = Number(value) || 0;
                const newTotal = Number(prevData.amount.subTotal) + (Number(prevData.amount.subTotal) * 0.01 * newTax);
                return {
                    ...prevData,
                    amount: {
                        ...prevData.amount,
                        tax: value,
                        total: String(newTotal),
                    },
                };
            }
            return {
                ...prevData,
                [section]: key ? { ...prevData[section], [key]: value } : value,
            };
        });
    };

    const handleProducts = (e, index, key) => {
        const { value } = e.target;
        setInvoiceData((prevData) => {
            const updatedList = [...prevData.products];
            updatedList[index] = {
                ...updatedList[index],
                [key]: value,
            };
            if (key === "quantity" || key === "price") {
                updatedList[index].total = String(Number(updatedList[index].quantity) * Number(updatedList[index].price));
            }
            const newSubTotal = updatedList.reduce((sum, item) => sum + Number(item.total || 0), 0);
            const newTotal = newSubTotal + (newSubTotal * 0.01 * Number(prevData.amount.tax || 0));
            return {
                ...prevData,
                products: updatedList,
                amount: {
                    ...prevData.amount,
                    subTotal: String(newSubTotal),
                    total: String(newTotal),
                },
            };
        });
    };

    const addProduct = () => {
        setInvoiceData((prevData) => {
            const newId = prevData.products.length + 1;
            return {
                ...prevData,
                products: [
                    ...prevData.products,
                    { id: String(newId), name: "", quantity: "", price: "", total: "" },
                ],
            };
        });
    };

    const deleteProduct = (index) => {
        setInvoiceData((prevData) => {
            const updatedList = prevData.products.filter((_, i) => i !== index);
            updatedList.forEach((product, index) => {
                product.id = String(index + 1);
            });
            const newSubTotal = updatedList.reduce((sum, item) => sum + Number(item.total || 0), 0);
            const newTotal = newSubTotal + (newSubTotal * 0.01 * Number(prevData.amount.tax || 0));
            return {
                ...prevData,
                products: updatedList,
                amount: {
                    ...prevData.amount,
                    subTotal: String(newSubTotal),
                    total: String(newTotal),
                },
            };
        });
    };

    const downloadInvoice = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post("/api/invoice", invoiceData, { 
                responseType: "blob",
                headers: {Authorization: `Bearer ${token}`} 
            });
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            saveAs(pdfBlob, "invoice.pdf");
        } catch (err) {
            window.alert(err.message);
        }
    };

    return (
        <form method="post" onSubmit={downloadInvoice}>
            <div className="customer-details">
                <div className="billTo-details">
                    <h5>Bill To:</h5>
                    {Object.entries(invoiceData.billTo).map(([key, value]) => (
                        <input type="text" key={key} name={key} onChange={(e) => handleChange(e, "billTo", key)} value={value} placeholder={key} />
                    ))}
                </div>
                <div className="delivery-details">
                    <h5>Delivery Address:</h5>
                    <input type="text" name="address" onChange={(e) => handleChange(e, "deliveryTo", "address")} value={invoiceData.deliveryTo.address} placeholder="Delivery Address"/>
                </div>
            </div>
            <div className="product-details">
                <table>
                    <thead>
                        <tr className="header">
                            <th>Item No.</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.products.map((product, index) => (
                            <tr key={index}>
                                {Object.entries(product).map(([key, value]) => (
                                    <td key={key}>
                                        <input type="text" key={key} value={value} onChange={(e) => handleProducts(e, index, key)} />
                                    </td>
                                ))}
                                <td style={{ border: "none" }}>
                                    <button type="button" onClick={() => deleteProduct(index)}>
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4">Sub Total</td>
                            <td>{invoiceData.amount.subTotal}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">Tax</td>
                            <td>
                                <input type="text" value={invoiceData.amount.tax} onChange={(e) => handleChange(e, "amount", "tax")} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">Total</td>
                            <td>{invoiceData.amount.total}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button"  onClick={addProduct}>
                    Add Product
                </button>
            </div>
            <button className="cursor-pointer" type="submit">Generate Invoice</button>
        </form>
    );
}

export default Invoice;
