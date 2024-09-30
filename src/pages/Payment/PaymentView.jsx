import { useState, useEffect } from "react";
import "./PaymentView.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPayment } from "../../redux/slices/paymentSlice";
import PaymentTable from "../../components/PaymentTable/PaymentTable";

const PaymentView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {listPayment} = useSelector((state) => state.payments);
  const param = { pageNum: currentPage, pageSize: 10, sortDir: null, sortBy: null };

  useEffect(() => {
    const newParam = {
      ...param,
      pageNum: currentPage - 1,
    };
    dispatch(fetchAllPayment(newParam));
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

  const totalPages = listPayment?.totalPages;
  console.log(listPayment);

  return (
    <div className="payment-view">
      <h1>Payment Management</h1>
      {listPayment?.content &&
      <PaymentTable
        payments={listPayment.content}
        currentPage={currentPage}
        itemsPerPage={param.pageSize}
        handlePageChange={handlePageChange}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        handleSearchChange={handleSearchChange}
        handleStatusChange={handleStatusChange}
      />}
    </div>
  );
};

export default PaymentView;
