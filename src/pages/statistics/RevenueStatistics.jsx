// src/components/RevenueStatistic.js

import React, { useEffect, useState } from 'react';
import { mockRevenueData } from '../../data/data'; // Import dữ liệu mẫu
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import './RevenueStatistics.scss'; // Import file SCSS cho kiểu dáng

const RevenueStatistics = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenueByTime, setRevenueByTime] = useState([]);
    const [revenueByCategory, setRevenueByCategory] = useState([]);
    const [revenueByPaymentMethod, setRevenueByPaymentMethod] = useState([]);
    const [startDate, setStartDate] = useState('2023-01-01');
    const [endDate, setEndDate] = useState('2023-12-31');

    useEffect(() => {
        // Sử dụng dữ liệu mẫu
        setTotalRevenue(mockRevenueData.total);
        setRevenueByTime(mockRevenueData.revenueByTime);
        setRevenueByCategory(mockRevenueData.revenueByCategory);
        setRevenueByPaymentMethod(mockRevenueData.revenueByPaymentMethod);
    }, []);

    const handleDateChange = () => {
        // Cập nhật dữ liệu theo khoảng thời gian
        // Ở đây bạn có thể gọi API để lấy dữ liệu mới dựa trên startDate và endDate
        console.log(`Fetching data from ${startDate} to ${endDate}`);
    };

    return (
        <div className="revenue-statistics">
            <h1>Thống kê doanh thu</h1>
            <div className="summary">
                <p>Tổng doanh thu: <strong>{totalRevenue.toLocaleString()} VND</strong></p>
            </div>

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

            <div className="charts">
                <div className="chart">
                    <h2>Doanh thu theo thời gian</h2>
                    <BarChart width={600} height={300} data={revenueByTime}>
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </div>

                <div className="chart">
                    <h2>Doanh thu theo danh mục</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={revenueByCategory}
                            dataKey="total"
                            nameKey="_id"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {revenueByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                <div className="chart">
                    <h2>Doanh thu theo phương thức thanh toán</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={revenueByPaymentMethod}
                            dataKey="total"
                            nameKey="_id"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {revenueByPaymentMethod.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default RevenueStatistics;