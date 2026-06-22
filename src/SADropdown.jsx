import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const SADropdown = ({ value, options, onChange }) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState("bottom");
    const ref = useRef(null);

    const toggleDropdown = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            const dropdownHeight = Math.min(options.length * 40, 220);

            if (spaceBelow > dropdownHeight || spaceBelow > spaceAbove) {
                setPosition("bottom");
            } else {
                setPosition("top");
            }
        }

        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const displayValue = value === "ActivePackage" ? "Active Package" 
                       : value === "InactivePackage" ? "Inactive Package"
                       : value === "ExpiredPackage" ? "Expired Package"
                       : value;

    return (
        <div ref={ref} className={`relative w-full overflow-visible ${open ? "z-30" : "z-10"}`}>

            {/* BUTTON */}
            <button
                type="button"
                onClick={toggleDropdown}
                className={`
                  w-full border border-gray-300 rounded-xl px-3 pr-10 text-left text-sm h-11 relative cursor-pointer transition-all
                  ${value ? "bg-indigo-50/50 text-slate-800 font-medium" : "bg-white text-slate-500"}
                  focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                `}
            >
                <span className="block truncate">{displayValue || "Select"}</span>
                <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
                      absolute left-0 w-full bg-white
                      border border-slate-100 rounded-xl shadow-xl
                      z-[9999] max-h-52 overflow-y-auto p-1
                    "
                    style={{
                        top: position === "bottom" ? "100%" : "auto",
                        bottom: position === "top" ? "100%" : "auto",
                        marginTop: position === "bottom" ? "6px" : "0",
                        marginBottom: position === "top" ? "6px" : "0",
                    }}
                >
                    {options.map((item, i) => {
                        const itemDisplay = item === "ActivePackage" ? "Active Package" 
                                          : item === "InactivePackage" ? "Inactive Package"
                                          : item === "ExpiredPackage" ? "Expired Package"
                                          : item;
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    onChange(item);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                            >
                                {itemDisplay}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SADropdown;