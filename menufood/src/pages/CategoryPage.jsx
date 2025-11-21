import { useParams, useNavigate } from "react-router-dom";
import { foodData } from "../data/foodData";
import { useBasket } from "../context/BasketContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Home } from "lucide-react";


export default function CategoryPage() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const { basket, addToBasket, removeOneFromBasket } = useBasket();

    // Map categoryName to Persian
    const displayNames = {
        main: "غذای اصلی",
        appetizer: "پیش غذا",
        drinks: "نوشیدنی",
    };

    const displayName = displayNames[categoryName] || categoryName;

    // Filter foods by category
    const filteredFoods = foodData.filter(item => item.category === categoryName);

    // Total items for basket badge
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <div className=" p-6">
            {/* Basket Icon */}
            <div className="flex justify-between">

                <div>
                    <button
                        onClick={() => navigate("/basket")}
                        className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <ShoppingCartIcon className="w-8 h-8 text-gray-700" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
                <div className=" relative">

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <Home className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                    </button>



                </div>
            </div>



            {/* Page Title */}
            <h1 className="text-3xl font-bold text-center mb-8">{displayName}</h1>

            {/* Food Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredFoods.map((food) => {
                    // Get current quantity from basket
                    const quantity = basket.find(item => item.id === food.id)?.quantity || 0;

                    return (
                        <div
                            key={food.id}
                            className="relative rounded-xl shadow-lg overflow-hidden bg-white border hover:shadow-xl transition cursor-pointer"
                            onClick={() => navigate(`/category/${categoryName}/${food.id}`)}
                        >
                            <img
                                src={food.image}
                                alt={food.name}
                                className="w-full h-38 object-cover"
                            />

                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{food.name}</h2>
                                    <p className="text-green-600 mt-1 font-bold">
                                        {food.price.toLocaleString()} تومان
                                    </p>
                                </div>

                                {/* Counter */}
                                <div
                                    className="flex items-center gap-3"
                                    onClick={(e) => e.stopPropagation()} // prevent card click
                                >
                                    <button
                                        className="bg-gray-200 px-3 py-1 rounded-full text-xl"
                                        onClick={() => removeOneFromBasket(food.id)}
                                    >
                                        -
                                    </button>

                                    <span className="min-w-[24px] text-center font-bold">
                                        {quantity}
                                    </span>

                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded-full text-xl"
                                        onClick={() => addToBasket(food)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
