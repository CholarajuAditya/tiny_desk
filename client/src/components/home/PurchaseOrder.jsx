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
        <form method="post" onSubmit={downloadPO} className="flex flex-col bg-white shadow-2xl rounded-lg p-6 w-[60%] px-15 mx-auto mt-10">
            <div className="space-y-6">
                <div>
                    <h5 className="text-lg font-semibold">Vendor:</h5>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(poData.vendor).map(([key, value]) => (
                        <input type="text" key={key} name={key} onChange={(e) => handleChange(e, "vendor", key)} value={value} placeholder={key} className="border border-gray-300 rounded-lg p-2 mb-2 w-full" />
                    ))}
                    </div>
                </div>
                <div>
                    <h5 className="text-lg font-semibold">Delivery Address:</h5>
                    <input type="text" name="address" onChange={(e) => handleChange(e, "deliveryTo", "address")} value={poData.deliveryTo.address} placeholder="Delivery Address" className="border border-gray-300 rounded-lg p-2 w-full mt-2" />
                </div>
            </div>
            <div className="product-details mt-6">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 text-left">
                            <th className="p-2 border border-gray-300">Item No.</th>
                            <th className="p-2 border border-gray-300">Description</th>
                            <th className="p-2 border border-gray-300">Quantity</th>
                            <th className="p-2 border border-gray-300">Rate</th>
                            <th className="p-2 border border-gray-300">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {poData.products.map((product, index) => (
                            <tr key={index} className="relative border border-gray-300">
                            {Object.entries(product).map(([key, value]) => (
                                <td key={key} className="p-2 border border-gray-300">
                                    <input type="text" key={key} value={value} onChange={(e) => handleProducts(e, index, key)} className="px-2 py-1 w-full" />
                                </td>
                            ))}
                             <button type="button" onClick={() => deleteProduct(index)} className="absolute text-[18px] ml-2 translate-y-[30%] text-red-500 hover:text-red-700 font-bold border-none duration-150">X</button>
                            </tr>
                        ))}
                        <tr className="bg-gray-100">
                            <td colSpan="4" className="p-2 pr-5 text-right font-semibold">Total</td>
                            <td className="text-center p-2">{poData.total}</td>
                        </tr>
                    </tbody>
                </table>
            <button type="button" onClick={addProduct} className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-green-600">Add Product</button>
            </div>
            <button className="cursor-pointer bg-black text-white px-6 py-2 mt-6 rounded-lg hover:bg-gray-800 w-full" type="submit">Generate PO</button>
        </form>
    );
}

export default PurchaseOrder;
