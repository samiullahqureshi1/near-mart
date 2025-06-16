// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";

// const Hero = () => {
//   return (
//     <div
//       className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
//       style={{
//         backgroundImage:
//           "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
//       }}
//     >
//       <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
//         <h1
//           className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
//         >
//           Welcome To Nearmart,<br /> Store
//         </h1>
//         <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
//           assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
//           quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
//           <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
//         </p>
//         <Link to="/products" className="inline-block">
//             <div className={`${styles.button} mt-5`}>
//                  <span className="text-[#fff] font-[Poppins] text-[18px]">
//                     Shop Now
//                  </span>
//             </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const sliderImages = [
  {
    url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
    title: "Welcome To Nearmart, Store",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque exercitationem labore vel, dolore quidem asperiores.",
  },
  {
    url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg",
    title: "Best Deals on Latest Products",
    description:
      "Find amazing discounts and trending products at unbeatable prices. Shop your favourites now!",
  },
  {
    url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg",
    title: "New Arrivals Just Landed",
    description:
      "Explore our newest collection and stay ahead of the fashion curve.",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="relative w-full min-h-[70vh] 800px:min-h-[80vh]">
      <Slider {...settings}>
        {sliderImages.map((item, index) => (
          <div key={index}>
            <div
              className={`relative w-full min-h-[70vh] 800px:min-h-[80vh] bg-no-repeat bg-cover bg-center ${styles.noramlFlex}`}
              style={{ backgroundImage: `url(${item.url})` }}
            >
              <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
                  {item.title}
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                  {item.description}
                </p>
                <Link to="/products" className="inline-block">
                  <div className={`${styles.button} mt-5`}>
                    <span className="text-[#fff] font-[Poppins] text-[18px]">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
