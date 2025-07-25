import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateProduct from "../../components/Shop/CreateProduct";
import styles from '../../styles/styles';

const ShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
       <div className={`${styles.section} flex py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
          </div>
    </div>
  )
}

export default ShopCreateProduct