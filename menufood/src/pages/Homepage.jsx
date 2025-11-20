import { useState } from "react";
import BrandIntro from "../components/BrandIntro";
import CategoryPanel from "../components/CategoryPanel";

export default function HomePage() {
    const [open, setOpen] = useState(false);
    const [panelHeight, setPanelHeight] = useState(15); // in vh (closed preview)

    return (
        <div className="h-screen overflow-hidden relative">
            {/* Top Section */}
            <BrandIntro panelHeight={panelHeight} />

            {/* swipe indicator positioned above the bottom panel */}
            {!open && (
                <div
                    className="absolute left-0 right-0 flex justify-center pointer-events-none"
                    style={{ bottom: `calc(${panelHeight}vh + 0.5rem)` }}
                >
                </div>
            )}

            {/* Bottom Panel */}
            <CategoryPanel open={open} setOpen={setOpen} onHeightChange={setPanelHeight} />
        </div>
    );
}
