import React, { useEffect } from 'react';
import './CustomerInsights.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerOverview } from '../../redux/slices/statisticSlice';

const CustomerInsights = () => {
  const dispatch = useDispatch();
  const customerOverview = useSelector((state) => state.statistics.customerOverview);
 
  useEffect(() => {
    // Gọi API để lấy dữ liệu về tổng quan khách hàng
    dispatch(fetchCustomerOverview());
  }, [dispatch]);

  return (
    <div className="customer-insights">
      <h3>Customer Insights</h3>
      <ul>
        <li>New Customers: {customerOverview.totalNewCustomer}</li>
        <li>Returning Customers: {customerOverview.totalReturningCustomer}</li>
        <li>Total Customers: {customerOverview.totalCustomer}</li>
      </ul>
    </div>
  );
};

export default CustomerInsights;
