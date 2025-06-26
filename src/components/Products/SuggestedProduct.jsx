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
    </div>
  );
};

export default SuggestedProduct;

