import { useNavigate } from "react-router-dom";
import { memo } from "react";

const CategoryItem = memo(({ label, image, link }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden"
    >
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy" // Lazy load image
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center w-full">
        <span className="flex-1 text-white text-center text-2xl">{label}</span>
      </div>
    </div>
  );
});

function CategoryCard() {
  const categories = [
    { label: "غذای اصلی", image: "/assets/mainfoodpic.jpg", link: "/category/main" },
    { label: "پیش غذا", image: "/assets/fries.jpg", link: "/category/appetizer" },
    { label: "نوشیدنی", image: "/assets/Doogh.jpg", link: "/category/drinks" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 overflow-y-auto h-[90vh] pb-22 mt-10">
        {categories.map((cat) => (
          <CategoryItem
            key={cat.label}
            label={cat.label}
            image={cat.image}
            link={cat.link}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
