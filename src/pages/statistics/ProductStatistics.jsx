import React, { useEffect, useState } from "react";

import "./ProductStatistics.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStatistic,
  fetchProductTopSale,
  getProductInStock,
  getProductSold,
} from "../../redux/slices/productSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { fetchSubCategory } from "../../redux/slices/categorySlice";
import { fetchStatisticCategoryBySold } from "../../redux/slices/statisticSlice";

const ProductStatistics = () => {
  const dispatch = useDispatch();
  const [paramProductTopSale, setParamProductTopSale] = useState({
    categoryId: null,
    startDate: null,
    endDate: null,
  });

  const [paramProductTable, setParamProductTable] = useState({
    pageNum: 0,
    startDate: null,
    endDate: null,
  });

  const { listProductTopSale, listProductStatistic, totalStock, totalSold } =
    useSelector((state) => state.products);
  const { subCategories } = useSelector((state) => state.categories);
  const { statisticCategoryBySold, statisticCategoryByTotal } = useSelector(
    (state) => state.statistics
  );

  useEffect(() => {
    dispatch(fetchStatisticCategoryBySold());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductStatistic(paramProductTable));
  }, [dispatch, paramProductTable]);

  useEffect(() => {
    dispatch(fetchProductTopSale(paramProductTopSale));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductSold());
    dispatch(getProductInStock());
    dispatch(fetchSubCategory());
  }, [dispatch]);

  const handleFilterProductTopSale = () => {
    dispatch(fetchProductTopSale(paramProductTopSale));
  };

  const handleFilterProductTable = () => {
    dispatch(fetchProductStatistic(paramProductTable));
  };

  const handleChangeParamProductTopSale = (e) => {
    const { name, value } = e.target;
    setParamProductTopSale((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeParamProductTable = (e) => {
    const { name, value } = e.target;
    setParamProductTable((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const categoryChartData = statisticCategoryBySold.map((item) => ({
    category: item.name, // Tên danh mục
    sold: item.quantity, // Số lượng bán
  }));

  return (
    <div className="container">
      <div className="product-statistic">
        <h1 style={{ color: "black", paddingBottom: "20px" }}>Thống kê sản phẩm</h1>
        <p style={{fontSize: "16px", fontWeight: 600}}>Số lượng sản phẩm bán ra: {totalSold}</p>
        <p style={{fontSize: "16px", fontWeight: 600}}>Sản phẩm tồn kho: {totalStock}</p>
        <div>
          <h3>Sản phẩm bán chạy nhất:</h3>
          <div className="filter-product">
            <label>Chọn ngày bắt đầu:</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChangeParamProductTopSale}
            />
            <label>Chọn ngày kết thúc:</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChangeParamProductTopSale}
            />
            <label>Chọn danh mục:</label>
            {subCategories && (
              <select
                onChange={handleChangeParamProductTopSale}
                name="categoryId"
              >
                <option value="">Tất cả</option>
                {subCategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            <button onClick={handleFilterProductTopSale}>Submit</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng bán</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {listProductTopSale &&
                listProductTopSale.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantitySold}</td>
                    <td>{item.totalSales}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="product">
          <h3>Thống kê theo thời gian</h3>
          <div className="filter-product">
            <label>Chọn ngày bắt đầu:</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChangeParamProductTable}
            />
            <label>Chọn ngày kết thúc:</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChangeParamProductTable}
            />
            <button onClick={handleFilterProductTable}>Submit</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng bán</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {listProductStatistic &&
                listProductStatistic.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantitySold}</td>
                    <td>{item.totalSales}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="button-action">
            <button
              onClick={() =>
                setParamProductTable((prev) => ({
                  ...prev,
                  pageNum: prev.pageNum - 1,
                }))
              }
              disabled={paramProductTable.pageNum === 0}
            >
              Prev
            </button>
            <button
              onClick={() =>
                setParamProductTable((prev) => ({
                  ...prev,
                  pageNum: prev.pageNum + 1,
                }))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
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
      </div>
    </div>
  );
};

export default ProductStatistics;
