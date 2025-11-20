import { useParams, useNavigate } from "react-router-dom";
import { foodData } from "../data/foodData";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const navigate = useNavigate();

    // Map URL param to Persian display name
    const displayNames = {
        main: "غذای اصلی",
        appetizer: "پیش غذا",
        drinks: "نوشیدنی",
    };

    const displayName = displayNames[categoryName] || categoryName;

    // Filter foods by category
    const filteredFoods = foodData.filter(item => item.category === categoryName);

    return (
        <div className="p-6">
            {/* Use displayName for the Persian title */}
            <h1 className="text-3xl font-bold text-center mb-6">{displayName}</h1>

            <div className="grid grid-cols-1 gap-6">
                {filteredFoods.map((food) => (
                    <div
                        key={food.id}
                        className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/category/${categoryName}/${food.id}`)}
                    >
                        <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{food.name}</h2>
                            <p className="text-gray-600 text-sm mt-1">{food.description}</p>
                            <p className="text-green-600 mt-2 font-bold">
                                {food.price.toLocaleString()} تومان
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
