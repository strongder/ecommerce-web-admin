import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderByUserId } from "../../redux/slices/orderSlice";

const OrderHistory = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const listOrder = useSelector((state) => state.orders.listOrderByUser);
    const param = {
      pageNum: currentPage,
      pageSize: 5,
      sortDir: null,
      sortBy: null,
    };
    const {id} = useParams();
    useEffect(() => {
      const newParam = {
        ...param,
        pageNum: currentPage - 1,
      };
      dispatch(fetchOrderByUserId(id, newParam));
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
    const totalPages = listOrder?.totalPages || 1;
    return (
      <div className="order-history">
        <h2>Lịch Sử Mua Hàng</h2>
        {listOrder?.content && 
        <OrderList
          orders={listOrder.content}
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
        />}
      </div>
    );
};

export default OrderHistory;
