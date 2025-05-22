import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaFileInvoiceSolid as Invoice } from "react-icons/lia";
import { MdOutlineInventory as Po } from "react-icons/md";
import { MdOutlineContacts as Contact } from "react-icons/md";
import { IoStatsChartSharp as Charts } from "react-icons/io5";

import chart from "/chart.png";
import rupee from "/rupee.png";
import dollar from "/dollar-coins.png";
import aboutUs from "/about-us.jpg";

function Landing() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };
    return (
        <div id="home" className="min-h-screen flex flex-col">
            <header className="w-[100%] flex justify-between items-center h-[80px] px-10 text-xl text-white bg-black">
                <h1 className="text-4xl font-montserrat">tinyDesk</h1>
                <nav className="flex items-center gap-[50px]">
                    <a
                        className="link-hover-effect cursor-pointer"
                        href="#home"
                    >
                        Home
                    </a>
                    <a
                        className="link-hover-effect cursor-pointer"
                        href="#aboutUs"
                    >
                        About
                    </a>
                    <a
                        className="link-hover-effect cursor-pointer"
                        href="#features"
                    >
                        Features
                    </a>
                    <button
                        onClick={handleClick}
                        className="bg-black text-white link-hover-effect px-[10px]"
                    >
                        Login
                    </button>
                </nav>
            </header>
            <main className="p-15 flex-grow bg-white">
                <div className="flex justify-between items-center">
                    <div className="gap-5 text-7xl flex flex-col font-bold">
                        <h1>
                            <span className="text-moneygreen">Bussiness</span>{" "}
                            Done
                        </h1>
                        <h1>smoothly</h1>
                    </div>
                    <div className="p-10 rounded-xl bg-black relative">
                        <img
                            className="w-[600px] h-[400px] object-contain"
                            src={chart}
                        />
                        <img
                            src={rupee}
                            className="w-[150px] absolute top-[-15px] right-[15px]"
                        />
                        <img
                            src={dollar}
                            className="w-[150px] absolute bottom-[-10px] left-[15px]"
                        />
                    </div>
                </div>
                <div
                    id="aboutUs"
                    className="mt-30 flex justify-between items-center gap-10"
                >
                    <div className="p-10 bg-black rounded-xl">
                        <img
                            src={aboutUs}
                            className="w-[600px] h-[400px] object-contain"
                        />
                    </div>
                    <div className="w-[650px] max-w-[700] text-xl/loose font-bold">
                        <div className="mb-7 text-7xl flex flex-col font-bold">
                            <h1>
                                About{" "}
                                <span className="text-moneygreen">Us?</span>
                            </h1>
                        </div>
                        <p>
                            <span className="text-moneygreen text-2xl">
                                Tiny Desk
                            </span>{" "}
                            is a lightweight, easy-to-use mini ERP solution
                            designed to simplify business operations for small
                            teams and organizations. We streamline essential
                            functions such as raising invoices and purchase
                            orders, generating insightful reports, and
                            maintaining organized records of customers and
                            vendors. Our platform helps businesses stay on top
                            of their financial and operational data with clarity
                            and efficiency, without the overhead of a full-scale
                            ERP system.
                        </p>
                    </div>
                </div>
                <div id="features" className="ml-5 mt-20">
                    <h1 className="text-7xl font-bold mb-3">
                        Why <span className="text-moneygreen">Us?</span>
                    </h1>
                    <p className="text-xl/loose font-bold">
                        <span className="text-moneygreen text-2xl">
                            Tiny Desk
                        </span>{" "}
                        brings together the key features you need, without
                        unnecessary complexity
                    </p>
                    <div className="mt-10 grid grid-cols-4 gap-10">
                        <div className="box">
                            <div>
                                <h1 className="features-header">
                                    <Invoice /> Invoice
                                </h1>
                                <p className="text-lg w-[250px]">
                                    Easily generate and manage invoices with tax
                                    calculations customer details. Keep track of
                                    payment status and history in one place.
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div>
                                <h1 className="features-header">
                                    <Po />
                                    Purchase Order
                                </h1>
                                <p className="text-lg w-[250px]">
                                    reate, send, and track purchase orders to
                                    vendors with ease. Stay on top of your
                                    inventory by maintaining clear and
                                    consistent order records.
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div>
                                <h1 className="features-header">
                                    <Contact />
                                    Business Contacts
                                </h1>
                                <p className="text-lg w-[250px]">
                                    Maintain organized records of customers and
                                    vendors , transaction history, and quick
                                    access for invoicing or communication.
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <div>
                                <h1 className="features-header">
                                    <Charts />
                                    Financial Overview
                                </h1>
                                <p className="text-lg w-[250px]">
                                    Get a clear snapshot of your business
                                    finances with real-time summaries of income,
                                    expenses, and overall cash flow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="w-full bg-black py-4 px-5 flex flex-col items-center text-white">
                <p>
                    You&apos;ve hit rock bottom — but hey, it&apos;s the perfect
                    time to join us! Just look for the login button (top right
                    corner, in case you forgot).
                </p>
                <p>
                    <span className="text-moneygreen">&copy;</span> All Rights
                    reserved
                </p>
            </footer>
        </div>
    );
}

export default Landing;
