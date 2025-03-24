import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

function PurchaseOrder() {
    const location = useLocation()
    const vendor = location.state?.contact

    const [poData, setPoData] = useState({
        vendor: {
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
        total: "",
    });

    useEffect(() => {
        if(vendor){
          setPoData((prevData) => ({
                ...prevData,
                vendor: {
                    name: vendor.name || "",
                    gstin: vendor.gstin || "",
                    city: vendor.address?.city || "",
                    pincode: vendor.address?.pincode || "",
                    phone: vendor.phone || "",
                }
            }));
        }  else {
            setPoData((prevData) => ({
                ...prevData,
                vendor: {
                    name: "",
                    gstin: "",
                    city: "",
                    pincode: "",
                    phone: "",
                }
            }));
        }
    }, [vendor]);
    
    const handleChange = (e, section, key) => {
        const { value } = e.target;
        setPoData((prevData) => {
            return {
                ...prevData,
                [section]: key ? { ...prevData[section], [key]: value } : value,
            };
        });
    };

    const handleProducts = (e, index, key) => {
        const { value } = e.target;
        setPoData((prevData) => {
            const updatedList = [...prevData.products];
            updatedList[index] = {
                ...updatedList[index],
                [key]: value,
            };
            if (key === "quantity" || key === "price") {
                updatedList[index].total = String(Number(updatedList[index].quantity) * Number(updatedList[index].price));
            }
            const newTotal = updatedList.reduce((sum, item) => sum + Number(item.total || 0), 0);
            return {
                ...prevData,
                products: updatedList,
                total: String(newTotal),
            };
        });
    };

    const addProduct = () => {
        setPoData((prevData) => {
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
        setPoData((prevData) => {
            const updatedList = prevData.products.filter((_, i) => i !== index);
            updatedList.forEach((product, index) => {
                product.id = String(index + 1);
            });
            const newTotal = updatedList.reduce((sum, item) => sum + Number(item.total || 0), 0);
            return {
                ...prevData,
                products: updatedList,
                total: String(newTotal),
            };
        });
    };

    const downloadPO = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const response = await axios.post("/api/po", poData, { 
                responseType: "blob",
                headers: {Authorization: `Bearer ${token}`} 
            });
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            saveAs(pdfBlob, "PO.pdf");
        } catch (err) {
            window.alert(err.message);
        }
    };

    return (
        <form method="post" onSubmit={downloadPO}>
            <div className="vendor-details">
                <div className="vendor-details">
                    <h5>Vendor:</h5>
                    {Object.entries(poData.vendor).map(([key, value]) => (
                        <input type="text" key={key} name={key} onChange={(e) => handleChange(e, "vendor", key)} value={value} placeholder={key} />
                    ))}
                </div>
                <div className="delivery-details">
                    <h5>Delivery Address:</h5>
                    <input type="text" name="address" onChange={(e) => handleChange(e, "deliveryTo", "address")} value={poData.deliveryTo.address} placeholder="Delivery Address"/>
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
                        {poData.products.map((product, index) => (
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
                            <td colSpan="4">Total</td>
                            <td>{poData.total}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button"  onClick={addProduct}>
                    Add Product
                </button>
            </div>
            <button className="cursor-pointer" type="submit">Generate PO</button>
        </form>
    );
}

export default PurchaseOrder;
