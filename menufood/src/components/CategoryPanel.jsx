// components/CategoryPanel.jsx
import { useRef, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { MoveLeft } from "lucide-react";

const CLOSED_HEIGHT = 15;   // ← You wanted 15vh
const OPEN_HEIGHT = "100dvh"; // ← Perfect on iPhone Safari

export default function CategoryPanel({ open, setOpen }) {
  const panelRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(CLOSED_HEIGHT);
  const velocity = useRef(0);

  const currentHeight = isDragging.current
    ? `${startHeight.current}vh`
    : open
    ? OPEN_HEIGHT
    : `${CLOSED_HEIGHT}vh`;

  const startDrag = (clientY) => {
    isDragging.current = true;
    startY.current = clientY;
    startHeight.current = open ? 100 : CLOSED_HEIGHT;
  };

  const moveDrag = (clientY) => {
    if (!isDragging.current) return;
    const delta = clientY - startY.current;
    velocity.current = delta;

    if (!open && delta < 0) { // swipe up when closed
      const progress = Math.min(Math.abs(delta) / 250, 1);
      const newHeight = CLOSED_HEIGHT + progress * (100 - CLOSED_HEIGHT);
      startHeight.current = newHeight;
      panelRef.current.style.height = `${newHeight}vh`;
    }
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const fast = Math.abs(velocity.current) > 400;
    const far = Math.abs(velocity.current) > 100;

    if (fast || (far && velocity.current < 0)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  // Touch & Mouse
  const onTouchStart = (e) => startDrag(e.touches[0].clientY);
  const onTouchMove = (e) => { e.preventDefault(); moveDrag(e.touches[0].clientY); };
  const onTouchEnd = endDrag;
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
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Bottom Sheet */}
      <div
        ref={panelRef}
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden touch-none select-none"
        style={{
          height: currentHeight,
          transition: isDragging.current ? "none" : "height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Drag Handle */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full cursor-grab active:cursor-grabbing z-10"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />

        {/* Header */}
        <div className="pt-16 px-6 flex items-center justify-center relative">
          <h2 className={`text-2xl font-bold text-gray-900 absolute transition-all duration-300 ${open ? "right-6" : "left-1/2 -translate-x-1/2"}`}>
            منو رستوران
          </h2>

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

        {/* Hint when closed */}
        {!open && (
          <p className="text-center text-gray-500 text-sm mt-3">بکشید بالا ↑</p>
        )}
      </div>
    </>
  );
}