// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/styles";
// import ProductCard from "../ProductCard/ProductCard";

// const BestDeals = () => {
//   const [data, setData] = useState([]);
//   const { allProducts } = useSelector((state) => state.products);

//   useEffect(() => {
//     const allProductsData = allProducts ? [...allProducts] : [];
//     const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
//     const firstSix = sortedData && sortedData.slice(0, 5); // 6 for wider layout
//     setData(firstSix);
//   }, [allProducts]);

//   return (
//     <div className={`${styles.section} my-10`}>
//       <div className="text-center mb-6">
//         <h2 className="text-[28px] font-bold tracking-wide uppercase">TRENDING</h2>
//         <p className="text-gray-600 italic">Top view in this week</p>
//       </div>
//       <div className="overflow-x-auto">
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 "> */}
//          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">

//           {data && data.length !== 0 &&
//             data.map((product, index) => (
//               <ProductCard key={index} data={product} isTrending={true} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BestDeals;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sorted);
    }
  }, [allProducts]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visibleProducts = data.slice(0, visibleCount);

  return (
   <div className="w-full my-12 px-6 md:px-12 lg:px-20 xl:px-32">
  <div className="text-center mb-10">
    <h2 className="text-[28px] font-bold tracking-wide uppercase">TRENDING</h2>
    <p className="text-gray-600 italic">Top view in this week</p>
  </div>

  {/* Grid Wrapper with Padding and Gap */}
  <div className="max-w-[1400px] mx-auto px-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
      {visibleProducts.map((product, index) => (
        <div key={index} className="w-full">
          <ProductCard data={product} isTrending={true} />
        </div>
      ))}
    </div>
  </div>

  {/* Load More Button */}
  {visibleCount < data.length && (
    <div className="text-center mt-10">
      <button
        onClick={handleLoadMore}
        className="border border-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition"
      >
        Load More
      </button>
    </div>
  )}
</div>

  );
};

export default BestDeals;
