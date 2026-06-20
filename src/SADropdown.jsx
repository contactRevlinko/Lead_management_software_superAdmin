import React, { useEffect, useRef, useState } from "react";

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

            if (spaceBelow >= dropdownHeight) {
                setPosition("bottom");
            } else if (spaceAbove >= dropdownHeight) {
                setPosition("top");
            } else {
                setPosition(spaceBelow > spaceAbove ? "bottom" : "top");
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

    return (
        <div ref={ref} className="relative w-full">

            {/* BUTTON */}
            <button
                type="button"
                onClick={toggleDropdown}
                className={`
          w-full border border-gray-300 rounded-md px-3 py-2 text-left
          ${value ? "bg-indigo-50" : "bg-white"}
        `}
            >
                {value || "Select"}
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
            absolute left-0 w-full bg-white
            border border-gray-200 rounded-xl shadow-lg
            z-[9999] max-h-52 overflow-y-auto
          "
                    style={{
                        top: position === "bottom" ? "100%" : "auto",
                        bottom: position === "top" ? "100%" : "auto",
                        marginTop: position === "bottom" ? "8px" : "0",
                        marginBottom: position === "top" ? "8px" : "0",
                    }}
                >
                    {options.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onChange(item);
                                setOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SADropdown;