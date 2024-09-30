import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPaymentByUser } from "../../redux/slices/paymentSlice";

const TransactionHistory = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const listPayment = useSelector((state) => state.payments.listPaymentByUser);
  const param = {
    pageNum: currentPage,
    pageSize: 5,
    sortDir: null,
    sortBy: null,
  };
  const { id } = useParams();
  useEffect(() => {
    const newParam = {
      ...param,
      pageNum: currentPage - 1,
    };
    dispatch(fetchPaymentByUser(id, newParam));
  }, [dispatch, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const totalPages = listPayment?.totalPages || 1;
  return (
    <div className="transaction-history">
      <h2>Lịch Sử Giao Dịch</h2>
      {listPayment?.content && (
        <PaymentList
          payments={listPayment?.content}
          currentPage={currentPage}
          itemsPerPage={param.pageSize}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          totalPages={totalPages}
          // searchTerm={searchTerm}
          // selectedStatus={selectedStatus}
          handleSearchChange={handleSearchChange}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
