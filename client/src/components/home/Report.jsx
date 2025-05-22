import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const years = Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
    );

    const fetchReport = async () => {
        setLoading(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${API_BASE_URL}/api/report?month=${month}&year=${year}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

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
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl shadow-gray-500 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Financial Report
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
                <select
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                >
                    {months.map((m, index) => (
                        <option key={m} value={index + 1}>
                            {m}
                        </option>
                    ))}
                </select>

                <select
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>

                <button
                    className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-50"
                    onClick={fetchReport}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Get Report"}
                </button>
            </div>

            {reportData && (
                <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
                    <p className="text-lg">
                        <strong>Month:</strong> {reportData.month}
                    </p>
                    <p className="text-lg">
                        <strong>Year:</strong> {reportData.year}
                    </p>
                    <p className="text-lg">
                        <strong>Total Revenue:</strong> ₹
                        {reportData.totalRevenue}
                    </p>
                    <p className="text-lg">
                        <strong>Total Expenses:</strong> ₹
                        {reportData.totalExpenses}
                    </p>
                    <p className="text-lg font-semibold">
                        <strong>Profit:</strong> ₹{reportData.profit}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Report;
