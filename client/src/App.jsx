import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Login, Register, NotFound, Home } from "./pages/";
import {
    Report,
    Dashboard,
    ContactList,
    ContactProfile,
    Invoice,
    PurchaseOrder,
} from "./components/home/index.js";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/user" element={<Home />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route
                        path="customer"
                        element={
                            <ContactList
                                url={`${API_BASE_URL}/api/customer`}
                                entityName="customer"
                            />
                        }
                    />
                    <Route
                        path="vendor"
                        element={
                            <ContactList
                                url={`${API_BASE_URL}/api/vendor`}
                                entityName="vendor"
                            />
                        }
                    />
                    <Route
                        path="customer/:id"
                        element={
                            <ContactProfile
                                url={`${API_BASE_URL}/api/customer`}
                                entityName="customer"
                                btnAction="invoice"
                            />
                        }
                    />
                    <Route
                        path="vendor/:id"
                        element={
                            <ContactProfile
                                url={`${API_BASE_URL}/api/vendor`}
                                entityName="vendor"
                                btnAction="po"
                            />
                        }
                    />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="po" element={<PurchaseOrder />} />
                    <Route path="report" element={<Report />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
