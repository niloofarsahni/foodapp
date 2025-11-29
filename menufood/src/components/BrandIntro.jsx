import { motion } from "framer-motion";

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
            <div className="absolute inset-0 bg-black/50"></div>

            {/* CONTENT */}
            {/* <div className="relative z-10 pt-10 text-center text-white">
                <h1 className="text-4xl font-bold mt-5"> بهارک</h1>
                <p className="mt-6 font-medium text-xl">رستورانی با الهام از طراوت طبیعت و تم سبز، جایی برای تجربه طعم‌های تازه و سالم.</p>
            </div> */}
            <div className="relative z-10 pt-10 text-center text-white">
                <motion.h1
                    className="text-4xl font-bold mt-5"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    بهارک
                </motion.h1>

                <motion.p
                    className="mt-6 font-medium text-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
                >
                    رستورانی با الهام از طراوت طبیعت و تم سبز، جایی برای تجربه طعم‌های تازه و سالم.
                </motion.p>
            </div>

            {/* SWIPE UP TEXT */}
            {!open && (
                <p className="absolute left-0 right-0 flex justify-center 
                bottom-[13vh] text-gray-200 animate-bounce pointer-events-none z-10">
                    بکشید بالا
                </p>
            )}
        </div>
    );
}
