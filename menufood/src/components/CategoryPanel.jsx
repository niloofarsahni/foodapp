// components/CategoryPanel.jsx
import { useState, useRef, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { MoveLeft, ChevronUp } from "lucide-react";


const CLOSED_PERCENT = 18;
const OPEN_PERCENT = 90;

export default function CategoryPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);

    // Optional: Add swipe-to-close later (very smooth with this setup)

    return (
        <>
            {/* Backdrop - blur + fade */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                />
            )}

            {/* Bottom Sheet Panel */}
            <div
                ref={panelRef}
                className={`
          fixed inset-x-0 bottom-0 z-50 
          bg-white rounded-t-3xl shadow-2xl
          transition-all duration-500 ease-out
          ${isOpen ? 'translate-y-0' : `translate-y-[${100 - CLOSED_PERCENT}vh]`}
        `}
                style={{
                    height: isOpen ? `${OPEN_PERCENT}vh` : `${CLOSED_PERCENT}vh`,
                    maxHeight: '100vh',
                    // Respect safe areas (iOS notch, Android gestures)
                    paddingBottom: 'env(safe-area-inset-bottom)',
                }}
            >
                {/* Drag Handle + Header */}
                <div className="relative px-6 pt-4 pb-3">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
                        className="w-full flex flex-col items-center gap-3 select-none active:opacity-60 transition-opacity"
                    >


                        {/* Chevron Icon - rotates smoothly */}
                        <ChevronUp
                            className={`w-7 h-7 text-gray-600 transition-transform duration-800 animate-bounce ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                        {!isOpen && <h1 className="text-xl font-semibold">مشاهده منو</h1>}
                    </button>

                </div>

                {/* Scrollable Content */}
                <div
                    className={`
            px-6 pt-4  overflow-y-auto h-full
            transition-opacity duration-700 ease-out
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
                    style={{
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <div className="relative mb-8">


                        <h2 className="text-center text-2xl font-bold text-gray-900">
                            منو رستوران
                        </h2>
                    </div>

                    <div className="">
                        <CategoryCard />
                    </div>
                </div>
            </div>

         
        </>
    );
}