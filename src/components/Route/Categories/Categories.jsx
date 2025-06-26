import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";

const Categories = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <div className="w-full px-2 md:px-10 lg:px-20 xl:px-32 mb-12">
      <h2 className="text-lg md:text-lg font-semibold mb-1 text-left">
        Shop our most wanted
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4">
        {categoriesData.slice(0, 8).map((category) => (
          <div key={category.id} onClick={() => handleNavigate(category)} className="cursor-pointer">
            <div className=" rounded-xl w-full h-[200px] flex items-center justify-center">
              <img
                src={category.image_Url}
                alt={category.title}
                className="object-contain w-[80%] h-[80%]"
              />
            </div>
            <p className="mt-2 text-center text-[16px] font-medium">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
