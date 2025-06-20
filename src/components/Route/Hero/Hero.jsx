import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url('https://demo-kalles-4-1.myshopify.com/cdn/shop/files/main-slide.jpg?format=pjpg&v=1652086110&width=1920')",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <p className="pt-5 text-[18px] font-[bold] font-[800] text-gray-100 flex  justify-center">
          SUMMER LOOK
        </p>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-gray-100 font-[800] capitalize flex justify-center`}
        >
          FLASH SALE 70% OFF
          <br />
          {/* Welcome To Nearmart,<br /> Store */}
        </h1>
        {/* <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p> */}
        <Link to="/products" className="flex justify-center mt-5">
          <div className="px-8 py-3 border border-white rounded-full hover:bg-blue-300 transition duration-300">
            <span className="text-white  text-[18px] font-medium">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
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
