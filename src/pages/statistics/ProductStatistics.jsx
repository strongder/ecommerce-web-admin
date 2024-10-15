import React, { useEffect, useState } from "react";

import "./ProductStatistics.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStatistic,
  fetchProductTopSale,
  getProductInStock,
  getProductSold,
} from "../../redux/slices/productSlice";
import { fetchSubCategory } from "../../redux/slices/categorySlice";

const ProductStatistics = () => {
  const dispatch = useDispatch();
  const [paramProductTopSale, setParamProductTopSale] = useState({
    categoryId: null,
    startDate: null,
    endDate: null,
  });

  const [paramProductTable, setParamProductTable] = useState({
    page: 0,
    startDate: null,
    endDate: null,
  });

  const { listProductTopSale, listProductStatistic, totalStock, totalSold } =
    useSelector((state) => state.products);
  const { subCategories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProductStatistic(paramProductTable));
  }, [dispatch]);

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


  return (
    <div className="container">
      <div className="product-statistic">
        <h1 style={{ color: "black" }}>Thống kê sản phẩm</h1>
        <p>Số lượng sản phẩm bán ra: {totalSold}</p>
        <p>Sản phẩm tồn kho: {totalStock}</p>
        <div className="product">
          <h2>Thống kê theo thời gian</h2>
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
        </div>
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
      </div>
    </div>
  );
};

export default ProductStatistics;
