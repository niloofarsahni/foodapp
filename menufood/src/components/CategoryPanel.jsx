// components/CategoryPanel.jsx
import { useRef, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { MoveLeft } from "lucide-react";

const CLOSED_HEIGHT = 20;   // only title + handle
const OPEN_HEIGHT = 100;    // full screen

export default function CategoryPanel({ open, setOpen }) {
    const panelRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(CLOSED_HEIGHT);
    const velocity = useRef(0);

    const currentHeight = isDragging.current
        ? startHeight.current
        : open
            ? OPEN_HEIGHT
            : CLOSED_HEIGHT;

    const startDrag = (clientY) => {
        isDragging.current = true;
        startY.current = clientY;
        startHeight.current = open ? OPEN_HEIGHT : CLOSED_HEIGHT;
    };

    const moveDrag = (clientY) => {
        if (!isDragging.current) return;

        const delta = clientY - startY.current;
        velocity.current = delta;

        // Swipe up when closed → grow panel
        if (!open && delta < 0) {
            const progress = Math.min(Math.abs(delta) / 280, 1);
            const newHeight = CLOSED_HEIGHT + progress * (OPEN_HEIGHT - CLOSED_HEIGHT);
            startHeight.current = newHeight;
            panelRef.current.style.height = `${newHeight}vh`;
        }
        0
    };

    const endDrag = () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const fast = Math.abs(velocity.current) > 400;
        const far = Math.abs(velocity.current) > 120;

        if (fast || (far && velocity.current < 0)) {
            setOpen(true);
        } else if (fast || (far && velocity.current > 0)) {
            setOpen(false);
        } else {
            setOpen(currentHeight > 50);
        }
    };

    // Touch events
    const onTouchStart = (e) => startDrag(e.touches[0].clientY);
    const onTouchMove = (e) => {
        e.preventDefault();
        moveDrag(e.touches[0].clientY);
    };
    const onTouchEnd = endDrag;

    // Mouse events – works on desktop Chrome without DevTools!
    const onMouseDown = (e) => startDrag(e.clientY);
    const onMouseMove = (e) => moveDrag(e.clientY);
    const onMouseUp = endDrag;

    useEffect(() => {
        if (isDragging.current) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("touchmove", onTouchMove, { passive: false });
            window.addEventListener("touchend", onTouchEnd);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    return (
        <>
            {/* Dark backdrop only when open */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Bottom Sheet */}
            <div
                ref={panelRef}
                className="fixed inset-x-0 bottom-0 bg-white rounded-t-4xl shadow-2xl z-50 overflow-hidden touch-none select-none"
                style={{
                    height: `${currentHeight}vh`,
                    transition: isDragging.current ? "none" : "height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                {/* Drag Handle */}
                <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full cursor-grab active:cursor-grabbing z-10"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                />

                {/* Header – Super Simple & Perfect */}
                <div className="pt-14 px-6 flex items-center justify-center relative">
                    {/* Title */}
                    <h2 className={`text-2xl font-bold text-gray-900 absolute ${open ? "right-6" : "left-1/2 -translate-x-1/2"}`}>
                        منو رستوران
                    </h2>

                    {/* Back button – only when open */}
                    {open && (
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute left-6 p-3 rounded-xl hover:bg-gray-100 transition"
                        >
                            <MoveLeft className="w-7 h-7" />
                        </button>
                    )}
                </div>

                {/* Content – only when open */}
                {open && (
                    <div className="mt-6 px-6 pb-32 overflow-y-auto h-full">
                        <CategoryCard />
                    </div>
                )}


            </div>
        </>
    );
}