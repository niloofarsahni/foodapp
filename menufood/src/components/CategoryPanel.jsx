// components/CategoryPanel.jsx  ← MAXIMUM SENSITIVITY VERSION
import { useRef, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { MoveLeft } from "lucide-react";

const CLOSED_HEIGHT = 15;
const OPEN_HEIGHT = 90;

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

    if (!open && delta < 0) {
      // SUPER SENSITIVE: only 70px swipe = 100% open
      const progress = Math.min(Math.abs(delta) / 70, 1); // ← magic number
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

    // Opens with tiny swipe or any speed
    if (speed > 100 || distance > 15) { // ← 15px is enough!
      if (velocity.current < 0) setOpen(true);
      else setOpen(false);
    } else {
      setOpen(startHeight.current > 40);
    }
  };

  // Touch & Mouse events
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
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />}

      <div
        ref={panelRef}
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden touch-none select-none"
        style={{
          height: currentHeight,
          transition: isDragging.current ? "none" : "height 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)",
        }}
      >
        {/* Bigger & taller drag handle = easier to touch */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-400 rounded-full cursor-grab active:cursor-grabbing z-20"
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
            <button onClick={() => setOpen(false)} className="absolute left-6 p-3 rounded-xl hover:bg-gray-100">
              <MoveLeft className="w-7 h-7" />
            </button>
          )}
        </div>

        {open && (
          <div className="mt-6 px-6 pb-32 overflow-y-auto h-full">
            <CategoryCard />
          </div>
        )}

        {!open && (
          <p className="text-center text-gray-500 text-sm mt-3 select-none">بکشید بالا</p>
        )}
      </div>
    </>
  );
}