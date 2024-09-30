import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductView.scss";
import ProductDialog from "./ProductAdd";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchAllProduct } from "../../redux/slices/productSlice";

const ProductView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state) => state.products);
  const param = {
    pageNum: currentPage,
    pageSize: 10,
    sortDir: null,
    sortBy: null,
  };

  useEffect(() => {
    const newParam = {
      ...param,
      pageNum: currentPage - 1,
    };
    dispatch(fetchAllProduct(newParam));
  }, [dispatch, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleAddProduct = (product) => {
    console.log(product);
    dispatch(addProduct(product));
    const totalPages = Math.ceil(
      (listProduct.totalElements + 1) / param.pageSize
    );
    setCurrentPage(totalPages);
    handleCloseDialog();
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const totalPages = listProduct?.totalPages || 1;

  return (
    <div className="product-management">
      <h1>Quản lý sản phẩm</h1>
      <div className="search-bar">
        <button onClick={handleOpenDialog} className="add-button">
          Thêm sản phẩm
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Image</th>
            <th>Name</th>
            <th>Ngày thêm</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listProduct?.content &&
            listProduct.content.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1 + (currentPage - 1) * param.pageSize}</td>
                <td>
                  <img
                    src={product.imageUrls?.[0] || "placeholder.jpg"}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="action-button detail">
                    <Link to={`/products/${product.id}`}>Detail</Link>
                  </button>
                  <button className="action-button edit">
                    <Link to={`/products/update/${product.id}`}>Edit</Link>
                  </button>
                  <button className="action-button delete">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
      />

      {openDialog && (
        <ProductDialog
          onClose={handleCloseDialog}
          onAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
};

export default ProductView;
