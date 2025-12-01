import { motion } from "framer-motion";

export default function BrandIntro({ open }) {
    return (
        <div
            className={`relative transition-all duration-300 
  bg-no-repeat  bg-cover bg-center
            ${open ? "h-auto pb-10" : "h-[90%]"}`}
            style={{ backgroundImage: "url('/mainpicfood24.jpg')" }}
        >
            {/* Soft readable overlay (no position change) */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Subtle green atmosphere glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 "></div>

            <div className="relative z-10 pt-20 px-6 text-center text-white">
                <motion.h1
                    className="text-5xl font-extrabold tracking-tight drop-shadow-md "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    بهارک
                </motion.h1>

                <motion.p
                    className="mt-8 font-light text-lg leading-relaxed max-w-xl mx-auto text-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                جایی برای تجربه طعم‌های تازه و سالم.
                </motion.p>

                {/* Elegant divider */}
                <motion.div
                    className="mt-8 w-28 h-[3px] mx-auto bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full shadow-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                />

            </div>
        </div>
    );
}
