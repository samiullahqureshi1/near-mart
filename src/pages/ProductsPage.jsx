import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { categoriesData } from "../static/data";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const priceData = searchParams.get("price");
  const brandData = searchParams.getAll("brand");

  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    let filtered = allProducts;

    if (categoryData) {
      filtered = filtered?.filter((i) => i.category === categoryData);
    }

    if (brandData.length > 0) {
      filtered = filtered?.filter((i) => brandData.includes(i.brand));
    }

    if (priceData) {
      if (priceData === "Under $20") {
        filtered = filtered?.filter((i) => i.price < 20);
      } else if (priceData === "$25 to $100") {
        filtered = filtered?.filter((i) => i.price >= 25 && i.price <= 100);
      } else if (priceData === "$100 to $300") {
        filtered = filtered?.filter((i) => i.price >= 100 && i.price <= 300);
      } else if (priceData === "$300 to $500") {
        filtered = filtered?.filter((i) => i.price >= 300 && i.price <= 500);
      }
    }

    setData(filtered || []);
  }, [allProducts, categoryData, priceData, brandData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeHeading={3} />
          <div className="w-full py-6 px-4 md:px-10">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* LEFT SIDEBAR */}
              <div className="w-full lg:w-[270px] shrink-0  p-4 ">
                {/* CATEGORY */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold mb-3">CATEGORY</h3>
                  <ul className="space-y-2 text-sm">
                    {categoriesData.map((cat) => {
                      const isActive = categoryData === cat.title;

                      return (
                        <li key={cat.id}>
                          <Link
                            to={`/products?category=${encodeURIComponent(
                              cat.title
                            )}`}
                            className="flex items-center gap-2 px-2 py-1 hover:text-blue-600"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? "bg-orange-500" : "bg-gray-300"
                              }`}
                            ></span>
                            {cat.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* PRICE RANGE */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">PRICE RANGE</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "All Price",
                      "Under $20",
                      "$25 to $100",
                      "$100 to $300",
                      "$300 to $500",
                    ].map((range, i) => {
                      const isActive =
                        priceData === range ||
                        (range === "All Price" && !priceData);

                      return (
                        <li
                          key={i}
                          className="cursor-pointer"
                          onClick={() => {
                            if (range === "All Price") {
                              searchParams.delete("price");
                            } else {
                              searchParams.set("price", range);
                            }
                            setSearchParams(searchParams);
                          }}
                        >
                          <div className="flex items-center gap-2 px-2 py-1 hover:text-blue-600">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? "bg-orange-500" : "bg-gray-300"
                              }`}
                            ></span>
                            {range}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* BRANDS */}
                {/* <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-3">POPULAR BRANDS</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {[
                      "Apple",
                      "Samsung",
                      "Sony",
                      "Dell",
                      "HP",
                      "Xiaomi",
                      "Microsoft",
                      "LG",
                    ].map((brand, i) => {
                      const isChecked = brandData.includes(brand);
                      return (
                        <div key={i} className="flex items-center gap-1 w-1/2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              const current = searchParams.getAll("brand");
                              const updated = isChecked
                                ? current.filter((b) => b !== brand)
                                : [...current, brand];

                              searchParams.delete("brand");
                              updated.forEach((b) => searchParams.append("brand", b));
                              setSearchParams(searchParams);
                            }}
                          />
                          <label>{brand}</label>
                        </div>
                      );
                    })}
                  </div>
                </div> */}
              </div>

              {/* RIGHT CONTENT GRID */}
              <div className="w-full">
                {/* FILTER BAR */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    className="border px-3 py-2 rounded w-full md:w-[300px]"
                  />
                  <div className="text-sm text-gray-500">
                    <span className="mr-2">Sort by:</span>
                    <select className="border px-2 py-1 rounded">
                      <option>Most Popular</option>
                      <option>Price Low to High</option>
                      <option>Price High to Low</option>
                    </select>
                  </div>
                </div>

                {/* ACTIVE FILTERS */}
                {(categoryData || priceData || brandData.length > 0) && (
                  <div className="mb-4 text-sm text-gray-700 flex flex-wrap gap-2">
                    <strong className="w-full mb-1">Active Filters:</strong>

                    {categoryData && (
                      <button
                        onClick={() => {
                          searchParams.delete("category");
                          setSearchParams(searchParams);
                        }}
                        className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-200"
                      >
                        {categoryData} <span className="text-gray-400">×</span>
                      </button>
                    )}

                    {priceData && (
                      <button
                        onClick={() => {
                          searchParams.delete("price");
                          setSearchParams(searchParams);
                        }}
                        className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-200"
                      >
                        {priceData} <span className="text-gray-400">×</span>
                      </button>
                    )}

                    {brandData.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          const updated = brandData.filter((b) => b !== brand);
                          searchParams.delete("brand");
                          updated.forEach((b) =>
                            searchParams.append("brand", b)
                          );
                          setSearchParams(searchParams);
                        }}
                        className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-200"
                      >
                        {brand} <span className="text-gray-400">×</span>
                      </button>
                    ))}

                    {/* CLEAR ALL */}
                    <button
                      onClick={() => setSearchParams({})}
                      className="ml-auto text-blue-600 underline text-sm hover:text-blue-800"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
                  {data &&
                    data.map((i, index) => (
                      <ProductCard data={i} key={index} />
                    ))}
                </div>

                {/* NO RESULTS */}
                {data?.length === 0 && (
                  <p className="text-center py-16 text-gray-500 text-base">
                    No products found!
                  </p>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductsPage;
