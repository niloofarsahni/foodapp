import { useBasket } from "../context/BasketContext";
import { useNavigate } from "react-router-dom";
import { Home, MoveLeft } from "lucide-react";

export default function BasketPage() {
    const { basket, removeFromBasket, clearBasket } = useBasket();
    const navigate = useNavigate();

    const totalPrice = basket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (basket.length === 0)
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">
                    سبد خرید شما خالی است
                </h1>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                    بازگشت به صفحه اصلی
                </button>
            </div>
        );

    return (
        <div className="p-6">
            {/* ---------------- HEADER BUTTONS ---------------- */}
            <div className="flex justify-between items-center mb-4">
                {/* Home Button */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-1 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                    <Home className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </button>

                {/* Back Button */}
                <button
                    onClick={() => {
                        if (window.history.length > 1) {
                            navigate(-1); // go back
                        } else {
                            navigate("/"); // fallback home
                        }
                    }}
                    className="flex items-center gap-1 px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
                >
                    <MoveLeft className="w-8 h-6" />
                </button>
            </div>

            {/* ---------------- PAGE TITLE ---------------- */}
            <h1 className="text-3xl font-bold mb-6 text-center">سبد خرید</h1>

            {/* ---------------- ITEMS ---------------- */}
            <div className="space-y-4">
                {basket.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center p-4 border rounded-lg"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600">
                                {item.quantity} ×{" "}
                                {item.price.toLocaleString()} تومان
                            </p>
                        </div>

                        <button
                            onClick={() => removeFromBasket(item.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            حذف
                        </button>
                    </div>
                ))}
            </div>

            {/* ---------------- TOTAL PRICE ---------------- */}
            <h2 className="text-xl font-bold mt-6">
                جمع کل: {totalPrice.toLocaleString()} تومان
            </h2>

            {/* ---------------- ACTIONS ---------------- */}
           
            <div className="flex justify-center gap-6 mt-4 mb-5 fixed bottom-0 left-0 right-0 ">
                <button
                    onClick={clearBasket}
                    className="px-8 py-4 bg-gray-500 text-white text-lg font-medium rounded-lg hover:bg-gray-700"
                >
                    پاک کردن سبد
                </button>

                <button
                    onClick={() => alert("سفارش شما ثبت شد!")}
                    className="px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700"
                >
                    ثبت سفارش
                </button>
            </div>
        </div>
    );
}
