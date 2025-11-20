export default function BrandIntro({ open }) {
    return (
        <div
            className={`relative transition-all duration-300 
           bg-cover bg-[15%_40%]    bg-no-repeat 
            ${open ? "h-auto" : "h-[90%]"}`
            }
            style={{ backgroundImage: "url('/bg-food.jpg')" }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* CONTENT */}
            <div className="relative z-10 pt-10 text-center text-white">
                <h1 className="text-4xl font-bold">گرین هال</h1>
                <p className="mt-2">Fresh Food • Fast Delivery</p>
            </div>

            {/* SWIPE UP TEXT */}
            {!open && (
                <p className="absolute left-0 right-0 flex justify-center 
                bottom-[16vh] text-gray-200 animate-bounce pointer-events-none z-10">
                    بکشید بالا
                </p>
            )}
        </div>
    );
}
