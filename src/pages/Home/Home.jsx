import React from "react";
import "./Home.scss";
import SaleOverview from "../../components/SaleOverview/SaleOverviews.jsx";
import InventoryStatus from "../../components/InventoryStatus/InventoryStatus";
import CustomerInsights from "../../components/CustomerInsights/CustomerInsights.jsx";
import CategoryPerformance from "../../components/CategoryPerformance/CategoryPerformance";
import BestSellingProducts from "../../components/BestSellingProducts/BestSellingProducts.jsx";

const Home = () => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <BestSellingProducts />
      </div>

      {/* Grid hai: Đơn hàng gần đây, hiệu suất danh mục và thông tin khách hàng */}
      <div className="content-grid-two">
        <div className="grid-two-item">
          <div className="subgrid-two">
            {/* <CategoryPerformance /> */}
            <SaleOverview />
            <CustomerInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
