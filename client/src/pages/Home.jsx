import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BiHomeAlt2, BiMenu } from "react-icons/bi";
import { RiCustomerService2Line, RiShoppingCart2Line } from "react-icons/ri";
import { TbInvoice, TbReportSearch } from "react-icons/tb";
import { IoReceiptOutline } from "react-icons/io5";

const navLinks = [
    { to: "dashboard", icon: <BiHomeAlt2 />, label: "Dashboard" },
    { to: "customer", icon: <RiCustomerService2Line />, label: "Customers" },
    { to: "vendor", icon: <RiShoppingCart2Line />, label: "Vendors" },
    { to: "invoice", icon: <TbInvoice />, label: "Invoice" },
    { to: "po", icon: <IoReceiptOutline />, label: "PO" },
    { to: "report", icon: <TbReportSearch />, label: "Reports" },
];

const Sidebar = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md"
            >
                <BiMenu size={24} />
            </button>

            <div
                className={`fixed flex flex-col items-center bg-black min-w-60 h-screen px-10 py-10 justify-between transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:flex`}
            >
                <h1 className="text-white text-2xl">tiny desk</h1>
                <div className="flex flex-col">
                    {navLinks.map(({ to, icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "opacity-100 text-green-300" : ""
                                }`
                            }
                        >
                            {icon} {label}
                        </NavLink>
                    ))}
                </div>
                <button onClick={logout} className="btn w-[90%]">
                    Logout
                </button>
            </div>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 md:hidden"
                />
            )}
        </>
    );
};

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            alert("Unauthorized access. Try logging in again.");
            navigate("/");
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully.");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex w-full">
            <Sidebar logout={logout} />
            <div className="min-h-screen w-full md:pl-60 bg-gray-100">
                <Outlet className="h-full w-full" />
            </div>
        </div>
    );
};

export default Home;
