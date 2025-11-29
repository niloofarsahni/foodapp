// components/CategoryPanel.jsx  ← FINAL VERSION
import { useRef, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { MoveLeft}  from "lucide-react";

const CLOSED_HEIGHT = 15;   // 15vh when closed
const OPEN_HEIGHT = 90;     // 90vh when open ← perfect on iPhone

export default function CategoryPanel({ open, setOpen }) {
  const panelRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(CLOSED_HEIGHT);
  const velocity = useRef(0);

  const currentHeight = isDragging.current
    ? `${startHeight.current}vh`
    : open
    ? `${OPEN_HEIGHT}vh`
    : `${CLOSED_HEIGHT}vh`;

  const startDrag = (clientY) => {
    isDragging.current = true;
    startY.current = clientY;
    startHeight.current = open ? OPEN_HEIGHT : CLOSED_HEIGHT;
  };

  const moveDrag = (clientY) => {
    if (!isDragging.current) return;
    const delta = clientY - startY.current;
    velocity.current = delta;

    // Super sensitive: opens even with 40px swipe up
    if (!open && delta < 0) {
      const progress = Math.min(Math.abs(delta) / 120, 1); // ← very sensitive!
      const newHeight = CLOSED_HEIGHT + progress * (OPEN_HEIGHT - CLOSED_HEIGHT);
      startHeight.current = newHeight;
      panelRef.current.style.height = `${newHeight}vh`;
    }
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const speed = Math.abs(velocity.current);
    const distance = Math.abs(velocity.current);

    // Opens with very small swipe or any speed
    if (speed > 200 || distance > 40) {
      if (velocity.current < 0) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      // Snap to nearest
      setOpen(startHeight.current > 50);
    }
  };

  // Events
  const onTouchStart = (e) => startDrag(e.touches[0].clientY);
  const onTouchMove = (e) => {
    e.preventDefault();
    moveDrag(e.touches[0].clientY);
  };
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
          transition: isDragging.current ? "none" : "height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* Drag Handle – bigger & easier to grab */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-gray-400 rounded-full cursor-grab active:cursor-grabbing z-20"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />

        {/* Header */}
        <div className="pt-14 px-6 flex items-center justify-center relative">
          <h2 className={`text-2xl font-bold text-gray-900 absolute transition-all duration-300 ${open ? "right-6" : "left-1/2 -translate-x-1/2"}`}>
            منو رستوران
          </h2>

          {open && (
            <button
              onClick={() => setOpen(false)}
              className="absolute left-6 p-3 rounded-xl hover:bg-gray-100 transition"
            >
              ←
            </button>
          )}
        </div>

        {/* Content */}
        {open && (
          <div className="mt-6 px-6 pb-32 overflow-y-auto h-full">
            <CategoryCard />
          </div>
        )}

    
      </div>
    </>
  );
}