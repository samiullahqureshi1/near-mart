// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { brandingData, categoriesData } from "../../../static/data";
// import styles from "../../../styles/styles";

// const Categories = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className={`${styles.section} hidden sm:block`}>
//         <div
//           className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
//         >
//           {brandingData &&
//             brandingData.map((i, index) => (
//               <div className="flex items-start" key={index}>
//                 {i.icon}
//                 <div className="px-3">
//                   <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
//                   <p className="text-xs md:text-sm">{i.Description}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div
//         className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
//         id="categories"
//       >
//         <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
//           {categoriesData &&
//             categoriesData.map((i) => {
//               const handleSubmit = (i) => {
//                 navigate(`/products?category=${i.title}`);
//               };
//               return (
//                 <div
//                   className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
//                   key={i.id}
//                   onClick={() => handleSubmit(i)}
//                 >
//                   <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
//                   <img
//                     src={i.image_Url}
//                     className="w-[120px] object-cover"
//                     alt=""
//                   />
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;
import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <div className={`${styles.category} p-6 rounded-lg mb-12`} id="categories">
      <div className="grid grid-cols-1 lg:grid-cols-[4fr_1.75fr_1.75fr] gap-6">
        {/* Column 1: Full height (Women), width zyada */}
        <div
          className="relative cursor-pointer h-full"
          onClick={() => handleNavigate(categoriesData[0])}
        >
          <img
            src={categoriesData[0].image_Url}
            alt={categoriesData[0].title}
            className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out  hover:scale-105"
          />
          <div className="hover:bg-black hover:text-white absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded shadow text-black font-semibold">
            {categoriesData[0].title}
          </div>
        </div>

        {/* Column 2: Stack Accessories & Footwear */}
        <div className="flex flex-col gap-6">
          {[categoriesData[1], categoriesData[2]].map((category) => (
            <div
              key={category.id}
              className="relative cursor-pointer h-full"
              onClick={() => handleNavigate(category)}
            >
              <img
                src={category.image_Url}
                alt={category.title}
                className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out  hover:scale-105"
              />
              <div className="hover:bg-black hover:text-white absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded shadow text-black font-semibold">
                {category.title}
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: Tall Watch image */}
        <div
          className="relative cursor-pointer h-full"
          onClick={() => handleNavigate(categoriesData[3])}
        >
          <img
            src={categoriesData[3].image_Url}
            alt={categoriesData[3].title}
            className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out  hover:scale-105"
          />
          <div className="hover:bg-black hover:text-white absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded shadow text-black font-semibold">
            {categoriesData[3].title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
