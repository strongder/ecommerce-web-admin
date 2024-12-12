import React, { useEffect } from "react";
import "./SaleOverview.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderOverview } from "../../redux/slices/statisticSlice";

const SaleOverview = () => {
  const dispatch = useDispatch();
  const orderOverview = useSelector((state) => state.statistics.orderOverview);
  const param = {startDate: '1970-01-01', endDate: new Date(Date.now() + 86400000).toISOString().split("T")[0]};
  

  useEffect(() => {
    // Gọi API để lấy dữ liệu về tổng quan khách hàng
    dispatch(fetchOrderOverview({param}));
  }, [dispatch]);

  return (
    <div className="sales-overview">
      <h3>Sales Overview</h3>
      {orderOverview && (
        <ul>
          <li>Total Sales: {orderOverview?.totalRevenue?.toLocaleString("vi-VI")}</li>
          <li>Completed Orders: {orderOverview.totalCompleted}</li>
          <li>Pending Orders: {orderOverview.totalPending}</li>
          <li>Processing Orders: {orderOverview.totalProcessing}</li>
          <li>Shipping Orders: {orderOverview.totalShipping}</li>
          <li>Cancelled Orders: {orderOverview.totalCanceled}</li>
        </ul>
      )}
    </div>
  );
};

export default SaleOverview;
