import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import "./CategoryStatistics.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStatisticCategoryBySold,
  fetchStatisticCategoryByTotal,
} from "../../redux/slices/statisticSlice";

const CategoryStatistics = () => {
  const dispatch = useDispatch();

  const { statisticCategoryBySold, statisticCategoryByTotal } = useSelector(
    (state) => state.statistics
  );

  useEffect(() => {
    dispatch(fetchStatisticCategoryBySold());
    dispatch(fetchStatisticCategoryByTotal());
  }, [dispatch]);

  // Dữ liệu cho biểu đồ doanh số theo danh mục
  const categoryChartData = statisticCategoryBySold.map((item) => ({
    category: item.name, // Tên danh mục
    sold: item.quantity, // Số lượng bán
  }));

  // Dữ liệu cho biểu đồ hiệu suất danh mục
  const performanceChartData = statisticCategoryByTotal.map((item) => ({
    category: item.name, // Tên danh mục
    revenue: item.total, // Điểm hiệu suất
  }));

  return (
    <div className="container-category">
      <div className="category-statistic">
        <h2>Thống kê danh mục</h2>

        <div className="chart">
          <h3>Số lượng sản phẩm bán ra theo danh mục:</h3>

          {categoryChartData && (
            <BarChart width={900} height={400} data={categoryChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#82ca9d" />
            </BarChart>
          )}
        </div>
        <div className="chart">
          <h3>Hiệu suất danh mục:</h3>
          {performanceChartData && (
            <BarChart width={900} height={400} data={performanceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#ff7300" />
            </BarChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryStatistics;
