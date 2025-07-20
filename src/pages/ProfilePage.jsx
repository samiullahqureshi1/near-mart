// import React, { useState } from "react";
// import Header from "../components/Layout/Header";
// import styles from "../styles/styles";
// import Loader from "../components/Layout/Loader";
// import ProfileSideBar from "../components/Profile/ProfileSidebar";
// import ProfileContent from "../components/Profile/ProfileContent";
// import { useSelector } from "react-redux";
// import FooterWithNewsletter from "../components/Layout/Footer";

// const ProfilePage = () => {
//   const { loading } = useSelector((state) => state.user);
//   const [active, setActive] = useState(1);

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Header />
//           <div className={`${styles.section} flex  py-10`}>
//             <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
//               <ProfileSideBar active={active} setActive={setActive} />
//             </div>
//             <ProfileContent active={active} />
//           </div>
//           <FooterWithNewsletter/>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import FooterWithNewsletter from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/user";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
          <FooterWithNewsletter />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
