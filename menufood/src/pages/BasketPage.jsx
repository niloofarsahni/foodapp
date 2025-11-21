import { useBasket } from "../context/BasketContext";
import { useNavigate } from "react-router-dom";

export default function BasketPage() {
    const { basket, removeFromBasket, clearBasket } = useBasket();
    const navigate = useNavigate();

    const totalPrice = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (basket.length === 0) return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
            <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                بازگشت به صفحه اصلی
            </button>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">سبد خرید</h1>
            <div className="space-y-4">
                {basket.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600">{item.quantity} × {item.price.toLocaleString()} تومان</p>
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

            <h2 className="text-2xl font-bold mt-6">جمع کل: {totalPrice.toLocaleString()} تومان</h2>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={clearBasket}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    پاک کردن سبد
                </button>

                <button
                    onClick={() => alert("سفارش شما ثبت شد!")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    ثبت سفارش
                </button>
            </div>
        </div>
    );
}
