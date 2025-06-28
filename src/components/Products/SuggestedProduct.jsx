// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { productData } from "../../static/data";
// import styles from "../../styles/styles";
// import ProductCard from "../Route/ProductCard/ProductCard";

// const SuggestedProduct = ({ data }) => {
//   const {allProducts} = useSelector((state) => state.products);
//   const [productData,setProductData] = useState();

//   useEffect(() => {
//     const d =
//     allProducts && allProducts.filter((i) => i.category === data.category);
//     setProductData(d);
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <div className='p-4 w-11/12 mx-auto'>
//           <h2
//             className={`text-gray-700 font-semibold mb-2`}
//           >
//             You may also Like
//           </h2>
//           <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
//              {
//                 productData && productData.map((i,index) => (
//                     <ProductCard data={i} key={index} />
//                 ))
//              }
//       </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default SuggestedProduct;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state
    setLoading(true);

    // Filter the products based on the category
    const filteredProducts = allProducts.filter((i) => i.category === data.category);
    setProductData(filteredProducts);

    // Set loading state to false once data is set
    setLoading(false);
  }, [allProducts, data.category]); // Dependency on allProducts and data.category

  return (
    <div>
      {data && (
        <div className={`bg-white p-4  mx-auto`}>
          {/* Heading above the cards */}
          <h2 className={`text-gray-700 font-semibold mb-2 flex justify-center`}>
            You may also Like
          </h2>
          <div className="flex justify-center items-center mb-12">
            <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
              {loading ? (
                <p>Loading...</p> // Display a loading text while the data is being fetched
              ) : (
                productData.length > 0 ? (
                  productData.slice(0, 4).map((i, index) => (
                    <div className="w-full lg:w-[250px] md:w-[200px] sm:w-[180px] mx-auto"> {/* Adjust card width here */}
                      <ProductCard data={i} key={index} />
                    </div>
                  ))
                ) : (
                  <p>No products available in this category.</p> // Message when no products are available
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-100 py-12 px-4">
        {/* Welcome Section */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          {/* Text Section */}
          <div className="max-w-xl z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Near Mart
            </h2>
            <p className="text-gray-700 mb-6">
              The best prices for high-quality reborn tech by sellers we’ve
              checked and vetted. We don’t mind if you
              <a href="#" className="text-black underline ml-1">
                Google us.
              </a>
            </p>
            <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:opacity-90 transition">
              Get to know us
            </button>
          </div>

          {/* Background Pattern */}
          {/* <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white rounded-r-lg overflow-hidden z-0 hidden md:block">
      <div className="absolute inset-0 grid grid-cols-2 gap-0 opacity-90">
        <div className="bg-[#e8fd69] rounded-full w-full h-full rotate-[10deg]" />
        <div className="bg-[#e8fd69] rounded-full w-full h-full rotate-[10deg]" />
      </div>
    </div> */}
        </div>

        {/* Features Bar */}
        <div className="mt-6 max-w-6xl mx-auto bg-gray-200 rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-4">
          <div className="flex flex-col items-center text-sm">
            <span className="text-xl mb-1">🛡️</span>
            <span className="font-medium">1-year warranty</span>
          </div>
          <div className="flex flex-col items-center text-sm">
            <span className="text-xl mb-1">🚚</span>
            <span className="font-medium">Free standard shipping</span>
          </div>
          <div className="flex flex-col items-center text-sm">
            <span className="text-xl mb-1">🔄</span>
            <span className="font-medium">Free 30-day returns</span>
          </div>
          <div className="flex flex-col items-center text-sm">
            <span className="text-xl mb-1">🎧</span>
            <span className="font-medium">Friendly customer service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedProduct;

