import React from "react";
import { BadgeInfo } from "lucide-react";

const SAdeletepopup = ({ onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white w-[90%] md:w-[420px] text-center p-6 rounded-2xl border border-slate-200/60 shadow-xl overflow-visible">
                <BadgeInfo className="mb-3 w-11 h-11 p-2 rounded-full mx-auto text-red-600 bg-red-100" />

                <h1 className="font-bold text-xl text-slate-900 tracking-tight">
                    Delete This Item ?
                </h1>

                <p className="text-slate-500 text-sm mt-2">
                    Are you sure do you want to delete this element ?
                </p>
                <p className="text-slate-500 text-sm">
                    This action is final.
                </p>

                <div className="flex gap-4 mt-5">
                    <button
                        onClick={onClose}
                        className="w-full h-11 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="w-full h-11 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all shadow-sm shadow-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SAdeletepopup;