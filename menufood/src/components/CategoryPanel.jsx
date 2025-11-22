import CategoryCard from "./CategoryCard";
import { MoveLeft, Plus, ShoppingCart } from "lucide-react";

export default function CategoryPanel({ open, setOpen }) {
    return (
        <div
            className={`absolute bottom-0 left-0 right-0 bg-white
            rounded-t-2xl shadow-xl transition-all duration-300 p-6 z-20
            ${open ? "h-screen" : "h-[22vh]"}
        `}
        >
            {/* Drag handle (open when closed) */}
            {!open && (
                <div
                    className="w-12 h-2 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer"
                    onClick={() => setOpen(true)}
                />
            )}

            {/* TOP BAR WHEN OPEN */}
            {open && (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">دسته بندی</h2>

                    {/* Back Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-600 text-lg border px-6 py-2 rounded-lg hover:bg-gray-100"
                    >
                        <MoveLeft /> 
                    </button>
                </div>
            )}

            {/*(only visible when open) */}
            {open && (
                <CategoryCard></CategoryCard>
            )}

            {/* Small title when CLOSED */}
            {!open && (
                <h3 className="text-lg text-center text-gray-700 font-medium">
                    دسته‌بندی‌ها
                </h3>
            )}
        </div>
    );
}
