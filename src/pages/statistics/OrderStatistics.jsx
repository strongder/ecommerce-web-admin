import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Add dispatch and selector
import "./OrderStatistics.scss"; // Import file SCSS cho kiểu dáng
import { fetchOrderOverview } from "../../redux/slices/statisticSlice";
const OrderStatistics = () => {
  const dispatch = useDispatch();
  const orderOverview = useSelector((state) => state.statistics.orderOverview);
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000).toISOString().split("T")[0]);

  useEffect(() => {
    // Dispatch action to fetch data with the selected date range
    dispatch(fetchOrderOverview({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  const handleDateChange = () => {
    dispatch(fetchOrderOverview({ startDate, endDate }));
  };
  return (
    <div className="order-statistics">
      <h1>Thống kê đơn hàng</h1>
      <div className="date-filter">
        <label>
          Từ:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Đến:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleDateChange}>Lọc</button>
      </div>

      <table className="statistics-table">
        <thead>
          <tr>
            <th>Loại Thống Kê</th>
            <th>Số Lượng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tổng số đơn hàng</td>
            <td>{orderOverview?.totalOrder}</td>
          </tr>
          <tr>
            <td>Số đơn thành công</td>
            <td>{orderOverview?.totalCompleted}</td>
          </tr>
          <tr>
            <td>Số đơn thất bại</td>
            <td>{orderOverview?.totalCanceled}</td>
          </tr>
          <tr>
            <td>Số đơn thanh toán bằng COD</td>
            <td>{orderOverview?.totalCodPayment}</td>
          </tr>
          <tr>
            <td>Số đơn thanh toán qua VNPAY</td>
            <td>{orderOverview?.totalVnpayPayment}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatistics;
