import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images/LOGO.png";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navLinks = [
        { label: "Home", to: "/", type: "link" },
        { label: "About", to: "/about", type: "link" },
        { label: "Services", href: "#services", type: "anchor" },
        { label: "Exercises", href: "#exercises", type: "anchor" },
        { label: "Doctors", href: "#doctors", type: "anchor" },
        { label: "Stories", to: "/patient-stories", type: "link" },
        { label: "Posters", to: "/clinic-posters", type: "link" },
        { label: "Contact", to: "/contact", type: "link" },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled
                ? "bg-white shadow-md py-2 border-b border-slate-200"
                : "bg-white/90 border-b border-slate-100 py-4"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 z-50 relative group">
                    <div className="p-1 rounded-lg transition-all duration-300 shrink-0">
                        <img
                            src={logo}
                            alt="RK The Complete Care"
                            className="h-10 md:h-12 w-auto object-contain"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                    </div>
                    <div className="hidden sm:block">
                        <span className="block text-sm font-black tracking-tight leading-none text-blue-900 uppercase">
                            RK The Complete Care
                        </span>
                        <span className="block text-[11px] font-bold mt-1 text-blue-700 uppercase tracking-wider">
                            Physiotherapy Centre
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) =>
                        link.type === "link" ? (
                            <Link
                                key={link.label}
                                to={link.to}
                                className="px-3 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.label}
                                href={link.href}
                                className="px-3 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                            >
                                {link.label}
                            </a>
                        )
                    )}

                    <Link
                        to="/booking"
                        className="ml-4 px-5 py-2 rounded-lg font-bold text-[13px] bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200 shadow-sm"
                    >
                        Book Appointment
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden z-50 w-9 h-9 flex flex-col justify-center items-center gap-1 rounded-lg border border-slate-200 bg-slate-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-5 h-0.5 rounded transition-all duration-300 bg-slate-700 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                    <span className={`w-5 h-0.5 rounded transition-all duration-300 bg-slate-700 ${isOpen ? "opacity-0" : ""}`}></span>
                    <span className={`w-5 h-0.5 rounded transition-all duration-300 bg-slate-700 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-4 md:hidden"
                        >
                            <div className="relative z-10 flex flex-col items-center gap-2 w-full px-8">
                                {navLinks.map((link) =>
                                    link.type === "link" ? (
                                        <Link key={link.label} to={link.to} onClick={() => setIsOpen(false)}
                                            className="text-lg font-bold text-slate-800 hover:text-blue-700 transition-colors w-full text-center py-4 border-b border-slate-100">
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a key={link.label} href={link.href} onClick={() => setIsOpen(false)}
                                            className="text-lg font-bold text-slate-800 hover:text-blue-700 transition-colors w-full text-center py-4 border-b border-slate-100">
                                            {link.label}
                                        </a>
                                    )
                                )}
                                <Link to="/booking" onClick={() => setIsOpen(false)}
                                    className="mt-6 w-full py-4 bg-blue-700 text-white rounded-xl font-bold text-lg text-center shadow-lg">
                                    Book Appointment
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
