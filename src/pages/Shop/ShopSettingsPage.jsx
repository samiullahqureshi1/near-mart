import React from "react";
import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import styles from "../../styles/styles";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className={`${styles.section} flex py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
