import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderTable from "../OrderTable/OrderTable";
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
      console.log(id)
      dispatch(fetchOrderByUserId(id, newParam));
    }, [dispatch, currentPage, id]);
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
        {listOrder?.content && (
        <OrderTable
          orders={listOrder.content}
          currentPage={currentPage}
          itemsPerPage={param.pageSize}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          totalPages={totalPages}
          handleSearchChange={handleSearchChange}
        />
      )}
      </div>
    );
};

export default OrderHistory;
