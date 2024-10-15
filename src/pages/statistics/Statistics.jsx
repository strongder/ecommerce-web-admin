import React, { useState } from "react";

import "./Statistics.scss";
import RevenueStatistics from "./RevenueStatistics";
import OrderStatistics from "./OrderStatistics";
import ProductStatistics from "./ProductStatistics";
import CategoryStatistics from "./CategoryStatistics";
function Statistics() {
  const [activeTab, setActiveTab] = useState("revenue"); // Mặc định là tab Doanh thu

  const renderTabContent = () => {
    switch (activeTab) {
      case "revenue":
        return <RevenueStatistics />;
      case "orders":
        return <OrderStatistics />;
        case "categories":
          return <CategoryStatistics />;
      case "products":
        return <ProductStatistics />;
      default:
        return <RevenueDetails />;
    }
  };

  return (
    <div className="statistics-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "revenue" ? "active" : ""}`}
          onClick={() => setActiveTab("revenue")}
        >
          Doanh thu
        </button>

        <button
          className={`tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Sản phẩm
        </button>
        <button
          className={`tab ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Danh mục
        </button>
        <button
          className={`tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Đơn hàng
        </button>
      </div>

      {/* Hiển thị nội dung của tab đã chọn */}
      {renderTabContent()}
    </div>
  );
}

export default Statistics;
