import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination"; // Import component Pagination
import "./OrderTable.scss"; // Import CSS for the component

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
  const [statusFilter, setStatusFilter] = useState("ALL"); // Default filter is 'ALL'

  const statusOptions = [
    "ALL", "PENDING", "PENDING_PAYMENT", "PROCESSING", "CANCELLED", "SHIPPED", "COMPLETED"
  ];

  // Handle change for status filter
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders by searchTerm and statusFilter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order?.address?.recipientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())) ||
      (order?.address?.phone
        .toLowerCase()
        .includes(searchTerm.toLowerCase())); // Check for phone number
  
    const matchesStatus = statusFilter === "ALL" || order?.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });
  

  return (
    <div className="order-list">
      <div className="order-topbar">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="status-filter">
        <select value={statusFilter} onChange={handleStatusChange} className="status-select">
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      </div>


      <table className="order-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>RecipientName</th>
            <th>Phone</th>
            <th>Total</th>
            <th>PaymentMethod</th>
            <th>Status</th>
            <th>CreatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{order?.address?.recipientName}</td>
              <td>{order?.address?.phone}</td>
              <td>{order?.total}</td>
              <td>{order?.paymentMethod}</td>
              <td>{order?.status}</td>
              <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
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
