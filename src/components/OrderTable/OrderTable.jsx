import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination"; // Import component Pagination
import "./OrderTable.scss"; // Import CSS cho component
import { iconsImgs } from "../../utils/images";
const OrderTable = ({
  orders,
  currentPage,
  itemsPerPage,
  handlePageChange,
  handlePrevPage,
  handleNextPage,
  totalPages,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <div className="order-list">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Phone</th>
            <th>Total</th>
            <th>PaymentMethod</th>
            <th>Status</th>
            <th>CreateAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{order?.address?.recipientName}</td>
              <td>{order?.address?.phone}</td>
              <td>{order?.total}</td>
              <td>{order?.paymentMethod}</td>
              <td>{order?.status}</td>
              <td>{order?.createAt}</td>
              <td>
                <button className="action-button detail-button">
                  <Link to={`/orders/${order.id}`}>DETAIL</Link>
                </button>
                <button className="action-button delete-button">DELETE</button>
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
    </div>
  );
};

export default OrderTable;
