// src/components/RevenueStatistics.js

import React, { useEffect, useState } from "react";
import { mockRevenueData } from "../../data/data"; // Import dữ liệu mẫu
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./RevenueStatistics.scss"; // Import file SCSS cho kiểu dáng
import { useDispatch, useSelector } from "react-redux";
import { fetchStatisticRenevueByMonth } from "../../redux/slices/statisticSlice";

const RevenueStatistics = () => {
  const dispatch = useDispatch();
  const statisticRenevueByMonth = useSelector(
    (state) => state.statistics.statisticRenevueByMonth
  );
  const [monthlyData, setMonthlyData] = useState(statisticRenevueByMonth); // Dữ liệu mẫu

  useEffect(() => {
    setMonthlyData(statisticRenevueByMonth);
  }, [statisticRenevueByMonth]);
  useEffect(() => {
    dispatch(fetchStatisticRenevueByMonth(new Date().getFullYear()));
  }, [dispatch]);

  return (
    <div className="revenue-overview">
      <div className="statistic-month">
        {/* <h1>Tổng quan doanh thu theo năm</h1> */}
        <table>
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Số lượng sản phẩm bán ra</th>
              <th>Tổng số đơn hàng</th>
              <th>Doanh thu (VND)</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.quantitySold}</td>
                <td>{item.totalOrder}</td>
                <td>{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="line-chart">
          <LineChart width={700} height={300} data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatistics;
