// function CategoryCard() {

//     return (
//         <div>

//             <div className="grid grid-cols-1 gap-6 overflow-y-auto h-[88vh] pb-22  mt-10 ">
//                 <div className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden">
//                     <img
//                         src="/assets/mainfoodpic.jpg"
//                         alt="Main Dishes"
//                         className="absolute inset-0 w-full h-full object-cover"
//                         onError={(e) => { e.currentTarget.style.display = 'none' }}
//                     />
//                     <div className="absolute inset-0 bg-black/40" />
//                     <div className="relative z-10 flex items-center w-full">
//                         <span className="flex-1 text-white text-center text-2xl ">غذای اصلی</span>
//                     </div>
//                 </div>

//                 <div className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden">
//                     <img
//                         src="/assets/mainfoodpic.jpg"
//                         alt="Appetizers"
//                         className="absolute inset-0 w-full h-full object-cover"
//                         onError={(e) => { e.currentTarget.style.display = 'none' }}
//                     />
//                     <div className="absolute inset-0 bg-black/40" />
//                     <div className="relative z-10 flex items-center w-full">

//                         <span className="flex-1 text-white text-center text-2xl">پیش غذا</span>
//                     </div>
//                 </div>

//                 <div className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden">
//                     <img
//                         src="/assets/mainfoodpic.jpg"
//                         alt="Drinks"
//                         className="absolute inset-0 w-full h-full object-cover"
//                         onError={(e) => { e.currentTarget.style.display = 'none' }}
//                     />
//                     <div className="absolute inset-0 bg-black/40" />
//                     <div className="relative z-10 flex items-center w-full">

//                         <span className="flex-1 text-white text-2xl text-center">نوشیدنی</span>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     )

// }
// export default CategoryCard
import { useNavigate } from "react-router-dom";

function CategoryCard() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 overflow-y-auto h-[88vh] pb-22 mt-10">

                {/* MAIN DISHES */}
                <div
                    onClick={() => navigate("/category/main")}
                    className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden"
                >
                    <img
                        src="/assets/mainfoodpic.jpg"
                        alt="Main Dishes"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex items-center w-full">
                        <span className="flex-1 text-white text-center text-2xl">غذای اصلی</span>
                    </div>
                </div>

                {/* APPETIZERS */}
                <div
                    onClick={() => navigate("/category/appetizer")}
                    className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden"
                >
                    <img
                        src="/assets/mainfoodpic.jpg"
                        alt="Appetizers"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex items-center w-full">
                        <span className="flex-1 text-white text-center text-2xl">پیش غذا</span>
                    </div>
                </div>

                {/* DRINKS */}
                <div
                    onClick={() => navigate("/category/drinks")}
                    className="relative flex items-center gap-2 text-lg p-3 rounded-xl shadow-sm cursor-pointer overflow-hidden"
                >
                    <img
                        src="/assets/mainfoodpic.jpg"
                        alt="Drinks"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex items-center w-full">
                        <span className="flex-1 text-white text-center text-2xl">نوشیدنی</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CategoryCard;
