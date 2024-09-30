import React, { useState, useEffect } from 'react';
import './OrderView.scss'; // Import CSS cho trang
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrder } from '../../redux/slices/orderSlice';
import OrderTable from '../../components/OrderTable/OrderTable';

const OrderView = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Khởi tạo giá trị chuỗi rỗng thay vì null
  const [currentPage, setCurrentPage] = useState(1); // Khởi tạo page bắt đầu từ 1
  const dispatch = useDispatch();
  const { listOrder } = useSelector((state) => state.orders);
  const param = { pageNum: null, pageSize: 10, sortDir: null, sortBy: null }; // Bỏ setParam và chỉ sử dụng param trực tiếp

  useEffect(() => {
    // Cập nhật param khi trang hoặc tìm kiếm thay đổi
    const newParam = {
      ...param,
      pageNum: currentPage - 1,
    };
    dispatch(fetchAllOrder(newParam));
  }, [dispatch, currentPage]); // useEffect bây giờ không còn setParam

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    <div className="order-view">
      <h1>Danh sách Đơn Hàng</h1>
      {listOrder?.content && (
        <OrderTable
          orders={listOrder.content}
          currentPage={currentPage}
          itemsPerPage={param.pageSize}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      )}
    </div>
  );
};

export default OrderView;
