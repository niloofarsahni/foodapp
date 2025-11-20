import { useParams } from "react-router-dom";
import { foodData } from "../data/foodData";

export default function FoodPage() {
    const { foodId } = useParams();


    const food = foodData.find((item) => item.id === Number(foodId));

    if (!food) return <h1 className="p-6">Food not found</h1>;

    return (
        <div className="p-6">
            <img
                src={food.image}
                className="w-full h-64 object-cover rounded-xl"
            />
            <h1 className="text-3xl font-bold mt-4">{food.name}</h1>
            <p className="text-gray-600 mt-2">{food.description}</p>
            <p className="text-green-600 font-bold text-xl mt-4">
                {food.price.toLocaleString()} تومان
            </p>
        </div>
    );
}
