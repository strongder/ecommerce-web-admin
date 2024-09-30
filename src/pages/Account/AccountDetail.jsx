import React, { useState, useEffect } from "react";
import "./AccountDetail.scss"; // Import CSS cho trang
import { accountData } from "../../data/data"; // Import dữ liệu người dùng giả
import { orders } from "../../data/data";
import { Link, useParams } from "react-router-dom";
import { payments } from "../../data/data";
import PaymentList from "../../components/PaymentTable/PaymentTable";
import Pagination from "../../components/Pagination/Pagination";
import { shippingAddresses } from "../../data/data";
import OrderList from "../../components/OrderTable/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressByUserId,
  fetchUserById,
} from "../../redux/slices/userSlice";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import Avatar from "../../components/Avatar/Avatar";

const AccountDetail = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  const renderContent = () => {
    switch (activeTab) {
      case "basicInfo":
        return <BasicInfo />;
      case "orderHistory":
        return <OrderHistory />;
      case "transactionHistory":
        return <TransactionHistory />;
      case "shippingAddresses":
        return <ShippingAddresses />;
      default:
        return null;
    }
  };

  return (
    <div className="account-detail">
      <h1>Chi Tiết Người Dùng</h1>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "basicInfo" ? "active" : ""}`}
          onClick={() => setActiveTab("basicInfo")}
        >
          Infomation
        </button>
        <button
          className={`tab-button ${
            activeTab === "orderHistory" ? "active" : ""
          }`}
          onClick={() => setActiveTab("orderHistory")}
        >
          Order History
        </button>
        <button
          className={`tab-button ${
            activeTab === "transactionHistory" ? "active" : ""
          }`}
          onClick={() => setActiveTab("transactionHistory")}
        >
          Transaction History
        </button>
        <button
          className={`tab-button ${
            activeTab === "shippingAddresses" ? "active" : ""
          }`}
          onClick={() => setActiveTab("shippingAddresses")}
        >
          Shipping Addresses
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

const BasicInfo = () => {
  const account = useSelector((state) => state.users.user);
  const [active, setActive] = useState(false);
  return (
    <div className="account-info">
      <h2>Thông Tin Tài Khoản</h2>
      {account && (
        <div className="account-details">
          <div className="left-section">
            <div className="avatar">
              {account.avatar ? (
                <img src={account.avatar} alt="Avatar" />
              ) : (
                <Avatar fullName={account?.fullName || account.email} />
              )}
            </div>
            <div className="name-email">
              <div className="field">
                <span className="value">{account.fullName || "N/A"}</span>
              </div>
              <div className="field">
                <span className="value">{account.email}</span>
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="field">
              <span className="label">Username</span>
              <input value={account.username} />
            </div>
            <div className="field">
              <span className="label">Email:</span>
              <input type="text" value={account.email} />
            </div>
            <div className="field">
              <span className="label">FullName:</span>
              <input type="text" value={account.fullName} />
            </div>
            <div className="field">
              <span className="label">Phone:</span>
              <input type="text" value={account.phone} />
            </div>
            <div className="field">
              <span className="label">Roles:</span>
              <input
                value={
                  account.roles && account.roles.length > 0
                    ? account.roles.map((role) => role.name).join(", ")
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

const ShippingAddresses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const listAddress = useSelector((state) => state.users.listAddressByUser);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(fetchAddressByUserId(id));
  }, [dispatch, id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const totalPages = listAddress?.totalPages;

  return (
    <div className="shiiping-address">
      <h2>Địa Chỉ Giao Hàng</h2>
      <table className="address-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Thành Phố</th>
            <th>Quận/Huyện</th>
            <th>Phường/Xã</th>
            <th>Địa chỉ</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listAddress &&
            listAddress.map((address, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{address.city}</td>
                <td>{address.district}</td>
                <td>{address.ward}</td>
                <td>{address.addressDetail}</td>
                <td>
                  <Link to={`/account/${address.id}/shipping-address/${index}`}>
                    Edit
                  </Link>
                </td>
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
export default AccountDetail;
