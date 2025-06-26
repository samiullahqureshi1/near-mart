import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  const navigate=useNavigate()
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
      >
        {/* Slide 1 – Play house */}
        <SwiperSlide>
          <div
            className="w-full h-[250px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[400px] bg-no-repeat bg-center bg-cover flex items-center justify-start px-4 sm:px-8 md:px-16"
            style={{
              backgroundImage:
                "url('https://images.ctfassets.net/mmeshd7gafk1/1HffqGdvCNvzEd76biDWD8/7d2045b75dde4b454bf1744fd5d13432/WEB_HP_Dynamic_Top_Slider_dektop.jpg')",
            }}
          >
            <div className="p-4 sm:p-6 md:p-8 rounded-md max-w-[90%] sm:max-w-[70%] md:max-w-[500px]">
              <h1 className="text-[18px] sm:text-[22px] md:text-[28px] font-[700] text-[#0a0a23] leading-snug">
                Save on college before it{" "}
                <em className="italic font-semibold">starts</em>.
              </h1>
              <p className="mt-2 text-[13px] sm:text-[15px] md:text-[16px] text-[#0a0a23]">
                Get $50 off any MacBook above $600, now through 6/30 with the
                code <strong>MACBOOK50</strong>.
              </p>
              <Link to="/products">
                <button className="mt-4 px-5 py-2 bg-[#0a0a23] text-white text-[14px] sm:text-[16px] font-medium rounded-md hover:bg-[#333] transition">
                  Save now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 – Your uploaded image with same text layout */}
        <SwiperSlide>
          <div
            className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-between px-6 md:px-20"
            style={{
              backgroundImage:
                "url('https://images.ctfassets.net/mmeshd7gafk1/1hWDGbkNUwnOe8CEfFMlj1/e7821c195d5d5ce387ae195e54ef2181/MERCH_-_Dynamic_banners_-_Appliance_-_desktop__1_.jpg')", // save uploaded image here
            }}
          >
            <div className="max-w-[600px]  p-4 rounded-md">
              <h1 className="text-[26px] md:text-[36px] font-[700] text-[#0a0a23] leading-snug">
                Play house, <em className="italic font-semibold">for less</em>.
              </h1>
              <p className="mt-3 text-[15px] md:text-[18px] text-[#0a0a23]">
                Take $20 off your purchase of a home appliance above $250 now
                through 6/30 with the code <strong>HOME20</strong>.
              </p>
              <Link to="/products">
                <button className="mt-6 px-6 py-3 bg-[#0a0a23] text-white font-semibold rounded-md hover:bg-[#333] transition">
                  Save now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
         <SwiperSlide>
          <div
            className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-between px-6 md:px-20"
            style={{
              backgroundImage:
                "url('https://images.ctfassets.net/mmeshd7gafk1/7KykGDFIzL0ZXJGQsGTiBU/3d3691e94d8377ec08b2468964c605d4/WEB___HP_Banner_-_desktop_US.jpg')", // save uploaded image here
            }}
            onClick={()=>{
              navigate('/products')
            }}
          >
            {/* <div className="max-w-[600px]  p-4 rounded-md">
              <h1 className="text-[26px] md:text-[36px] font-[700] text-[#0a0a23] leading-snug">
                Play house, <em className="italic font-semibold">for less</em>.
              </h1>
              <p className="mt-3 text-[15px] md:text-[18px] text-[#0a0a23]">
                Take $20 off your purchase of a home appliance above $250 now
                through 6/30 with the code <strong>HOME20</strong>.
              </p>
              <Link to="/products">
                <button className="mt-6 px-6 py-3 bg-[#0a0a23] text-white font-semibold rounded-md hover:bg-[#333] transition">
                  Save now
                </button>
              </Link>
            </div> */}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;

// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import logo from "../../../Assests/Maskgroup.jpg";

// const Hero = () => {
//   return (
//     <div
//       className={`relative min-h-[40vh] 800px:min-h-[60vh] w-full bg-no-repeat bg-center ${styles.noramlFlex}`}
//       style={{
//         backgroundImage: `url(${logo})`,
//         backgroundSize: "cover", // Ensures the image covers the whole background
//         backgroundPosition: "center top", // Moves the image slightly down from the top
//         maxWidth: "90%", // Reduces the width of the image
//         margin: "0 auto", // Centers the image
//         paddingTop: "10%", // Adds space from the top
//       }}
//     >
//       <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
//         {/* You can add text and other elements here as needed */}
//         <Link to="/products" className="inline-block">
//           <div className={`${styles.button} mt-48`}>
//             <span className="text-[#fff] font-[Poppins] text-[18px]">
//               Shop Now
//             </span>
//           </div>{" "}
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;
