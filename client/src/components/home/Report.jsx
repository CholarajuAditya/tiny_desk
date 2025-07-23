import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "./";

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
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setReportData(response.data);
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
        <div className="flex flex-col items-center max-w-4xl mx-auto p-6 min-h-screen">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Financial Report
                </h2>

                {/* Selection Controls */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="text-md p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                        {months.map((m, index) => (
                            <option key={index} value={index + 1}>
                                {m}
                            </option>
                        ))}
                    </select>

                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="text-md p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={fetchReport}
                        disabled={loading}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Get Report"}
                    </button>
                </div>

                {/* Report Result */}
                {loading && <Loading />}

                {reportData && !loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 border border-gray-300 rounded-lg shadow-md">
                        <p className="text-lg">
                            <strong>Month:</strong>{" "}
                            {months[reportData.month - 1]}
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
                        <p className="text-lg font-semibold col-span-full">
                            <strong>Profit:</strong> ₹{reportData.profit}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report;
