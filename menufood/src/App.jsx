import { Routes, Route, Router } from "react-router-dom";
import HomePage from "./pages/MainPage";
import CategoryPage from "./pages/CategoryPage";
import FoodPage from "./pages/FoodPage";
import { BasketProvider } from "./context/BasketContext";
import BasketPage from "./pages/BasketPage";

export default function App() {
  return (
    <BasketProvider>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:foodId" element={<FoodPage />} />
        <Route path="/basket" element={<BasketPage />} />

      </Routes>




    </BasketProvider>

  );
}
