import React, { useState, useEffect } from "react";
import "./PaymentTable.scss"; // Import CSS cho trang
import Pagination from "../Pagination/Pagination"; // Import Pagination component

const PaymentTable = ({
  payments,
  currentPage,
  handlePageChange,
  handlePrevPage,
  handleNextPage,
  totalPages,
  searchTerm,
  selectedStatus,
  handleSearchChange,
  handleStatusChange,
}) => {
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.transactionId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "" || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="payment-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="filter-select"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="PENDING">Đang chờ</option>
          <option value="PAID">Hoàn tất</option>
          <option value="EXPIRED">Hết hạn</option>
          <option value="FAILED">Thất bại</option>
        </select>
      </div>

      <table className="payment-table">
        <thead>
          <tr>
            <th>Mã Giao Dịch</th>
            <th>Mã Đơn Hàng</th>
            <th>Số Tiền</th>
            <th>Phương Thức Thanh Toán</th>
            <th>Trạng Thái</th>
            <th>Thời Gian Thanh Toán</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.transactionId}>
              <td>{payment.transactionId}</td>
              <td>{payment.orderCode || "N/A"}</td>
              <td>{payment.amount.toLocaleString()} VND</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.paymentTime).toLocaleString("vi-VN")}</td>
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

export default PaymentTable;
