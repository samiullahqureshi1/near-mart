// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/styles";
// import ProductCard from "../ProductCard/ProductCard";

// const BestDeals = () => {
//   const [data, setData] = useState([]);
//   const { allProducts } = useSelector((state) => state.products);
//   useEffect(() => {
//     const allProductsData = allProducts ? [...allProducts] : [];
//     const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
//     const firstFive = sortedData && sortedData.slice(0, 5);
//     setData(firstFive);
//   }, [allProducts]);
  

//   return (
//     <div>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Best Deals</h1>
//         </div>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
//            {
//             data && data.length !== 0 &&(
//               <>
//                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
//               </>
//             )
//            }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BestDeals;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstSix = sortedData && sortedData.slice(0, 5); // 6 for wider layout
    setData(firstSix);
  }, [allProducts]);

  return (
    <div className={`${styles.section} my-10`}>
      <div className="text-center mb-6">
        <h2 className="text-[28px] font-bold tracking-wide uppercase">TRENDING</h2>
        <p className="text-gray-600 italic">Top view in this week</p>
      </div>
      <div className="overflow-x-auto">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 "> */}
         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">

          {data && data.length !== 0 &&
            data.map((product, index) => (
              <ProductCard key={index} data={product} isTrending={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
