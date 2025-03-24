import { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1); 
    const [year, setYear] = useState(new Date().getFullYear());
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/api/report?month=${month}&year=${year}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setReportData(response.data);
                console.log(response.data);
                
            }
        } catch (error) {
            alert("Error fetching report!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport(); 
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Financial Report</h2>

            <div className="flex gap-4 mb-4">
                <select className="p-2 border rounded" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                    {months.map((m, index) => (
                        <option key={m} value={index + 1}>{m}</option>
                    ))}
                </select>

                <select className="p-2 border rounded" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <button className="p-2 bg-green-500 text-white rounded" onClick={fetchReport} disabled={loading}>
                    {loading ? "Loading..." : "Get Report"}
                </button>
            </div>

            {reportData && (
                <div className="p-4 border rounded bg-gray-50">
                    <p><strong>Month:</strong> {reportData.month}</p>
                    <p><strong>Year:</strong> {reportData.year}</p>
                    <p><strong>Total Revenue:</strong> ₹{reportData.totalRevenue}</p>
                    <p><strong>Total Expenses:</strong> ₹{reportData.totalExpenses}</p>
                    <p><strong>Profit:</strong> ₹{reportData.profit}</p>
                </div>
            )}
        </div>
    );
};

export default Report;
