import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPaymentByUser } from "../../redux/slices/paymentSlice";
import PaymentTable from "../PaymentTable/PaymentTable";
const TransactionHistory = () => {
  
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
    dispatch(fetchPaymentByUser(id));
  }, [dispatch, currentPage]);

  console.log(listPayment)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  
  return (
    <div className="transaction-history">
      <h2>Lịch Sử Giao Dịch</h2>
      {listPayment && (
        <PaymentTable
          payments={listPayment}
          currentPage={currentPage}
          itemsPerPage={param.pageSize}
          handleSearchChange={handleSearchChange}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
