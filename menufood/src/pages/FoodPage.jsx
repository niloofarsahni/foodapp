import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { foodData } from "../data/foodData";
import { Button } from "@/components/ui/button";
import { useBasket } from "../context/BasketContext";
import { MoveLeft, Plus, ShoppingCart } from "lucide-react";
import { Home } from "lucide-react";


export default function FoodPage() {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { basket, addToBasket } = useBasket(); // <- basket added here
  const [quantity, setQuantity] = useState(1);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  const food = foodData.find((item) => item.id === Number(foodId));
  if (!food) return <h1 className="p-6">Food not found</h1>;

  const handleAdd = () => {
    addToBasket(food, quantity);
  };

  return (
    <div className="max-w-4xl mx-auto ">


      {/* Back button */}
      <div className="flex justify-around items-center  p-5">
        <div className="  relative">
          <button
            onClick={() => navigate("/basket")}
            className="relative rounded-full bg-gray-100 hover:bg-gray-200 transition m-2"
          >
            <ShoppingCart className="w-8 h-8 text-gray-700" />
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
            className="mt-1 p-2  rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Home className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
          </button>

        </div>
        <div>




          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1); // go back
              } else {
                navigate("/"); // fallback home
              }
            }} className="text-gray-600 text-lg border px-6 py-2 rounded-lg hover:bg-gray-100"
            aria-label="back"
          >
            <MoveLeft />
          </button>



        </div>
      </div>

      {/* Food details */}
      <div className="md:grid md:grid-cols-12 gap-6 bg-white shadow-sm">
        {/* Left: Image */}
        <div className="md:col-span-5 relative  ">
          <div className="relative overflow-hidden shadow-lg">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-65 object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 "></div>
          </div>

          {/* Overlapping div */}
          <div className="absolute  w-full -translate-y-6 bg-white rounded-t-4xl  p-6 z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold">{food.name}</h1>
            <p className="text-gray-600 mt-4 leading-relaxed mb-6">
              {food.description}
            </p>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-lg font-semibold text-green-600 mt-1">
                {food.price.toLocaleString()} تومان
              </div>
              <Button onClick={handleAdd} className="bg-green-600 p-5 text-white">
                افزودن به سبد خرید
              </Button>
            </div>
          </div>
        </div>


      </div>


      {/* Suggested drinks */}
      <section className="mt-40 p-6">
        <h3 className="text-lg font-semibold mb-4">پیشنهاد ما: نوشیدنی‌ها</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {foodData
            .filter((f) => f.category === "drinks" && f.id !== food.id)
            .map((f) => (
              <div
                key={f.id}
                className="flex-none w-40 bg-white rounded-lg shadow-sm overflow-hidden text-center"
              >
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-24 object-cover"
                />
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center   px-2 text-sm font-medium">{f.name}

                  </div>
                  <Button
                    onClick={() => addToBasket(f, 1)}
                    className="rounded-full bg-green-600 text-white m-2"
                  >
                    <Plus strokeWidth={4} />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </section>

    </div>
  );
}
