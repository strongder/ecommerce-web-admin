// src/components/OrderStatistics.js

import React, { useEffect, useState } from 'react';
import './OrderStatistics.scss'; // Import file SCSS cho kiểu dáng


export const mockOrderData = {
  totalOrders: 100, // Tổng số đơn hàng
  successfulOrders: 80, // Số lượng đơn hàng thành công
  failedOrders: 20, // Số lượng đơn hàng thất bại
  codOrders: 50, // Số đơn thanh toán bằng COD
  vnpayOrders: 30, // Số đơn thanh toán qua VNPAY
};
const OrderStatistics = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [successfulOrders, setSuccessfulOrders] = useState(0);
    const [failedOrders, setFailedOrders] = useState(0);
    const [codOrders, setCodOrders] = useState(0);
    const [vnpayOrders, setVnpayOrders] = useState(0);
    const [startDate, setStartDate] = useState('2023-01-01');
    const [endDate, setEndDate] = useState('2023-12-31');

    useEffect(() => {
        // Sử dụng dữ liệu mẫu
        setTotalOrders(mockOrderData.totalOrders);
        setSuccessfulOrders(mockOrderData.successfulOrders);
        setFailedOrders(mockOrderData.failedOrders);
        setCodOrders(mockOrderData.codOrders);
        setVnpayOrders(mockOrderData.vnpayOrders);
    }, []);

    const handleDateChange = () => {
        // Cập nhật dữ liệu theo khoảng thời gian
        // Ở đây bạn có thể gọi API để lấy dữ liệu mới dựa trên startDate và endDate
        console.log(`Fetching data from ${startDate} to ${endDate}`);
    };

    return (
        <div className="order-statistics">
            <h1>Thống kê đơn hàng</h1>
            <div className="date-filter">
                <label>
                    Từ:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    Đến:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={handleDateChange}>Lọc</button>
            </div>

            <div className="summary">
                <p>Tổng số đơn hàng: <strong>{totalOrders}</strong></p>
                <p>Số đơn thành công: <strong>{successfulOrders}</strong></p>
                <p>Số đơn thất bại: <strong>{failedOrders}</strong></p>
                <p>Số đơn thanh toán bằng COD: <strong>{codOrders}</strong></p>
                <p>Số đơn thanh toán qua VNPAY: <strong>{vnpayOrders}</strong></p>
            </div>
        </div>
    );
};

export default OrderStatistics;
