import React, { useState, useEffect, useRef } from "react";
import "./AccountDetail.scss"; // Import CSS cho trang
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressByUserId,
  fetchUserById,
  updateAvatar,
} from "../../redux/slices/userSlice";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import { toast } from "react-toastify";

const AccountDetail = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className="button-action">
        <button className="btn-exit" onClick={() => navigate(-1)}>
          Exit
        </button>
      </div>
    </div>
  );
};

const BasicInfo = () => {
  const account = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [avatarObj, setAvatarObj] = useState({ avatar: "" });
  const { id } = useParams();
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (account) {
      setAvatarObj({ ...avatarObj, avatar: account?.avatar });
    }
  }, [account]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarObj({ ...avatarObj, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateAvatar = () => {
    dispatch(updateAvatar({ avatar: avatarObj, id }));
    toast.success("Update avatar successfully");
  };
  
  return (
    <div className="account-info">
      <h2>Thông Tin Tài Khoản</h2>
      {account && (
        <div className="account-details">
          <div className="left-section">
            <div className="avatar" onClick = {() => fileInputRef.current.click()}>
              <input type="file" onChange={handleFileChange} ref = {fileInputRef} style={{display: "none"}} />
              {avatarObj && <img src={avatarObj.avatar} alt="Avatar" />}
            </div>
            <div className="name-email">
              <div className="field">
                <span className="value">{account?.username || "N/A"}</span>
              </div>
              <div className="field">
                <span className="value">{account?.email}</span>
              </div>
            </div>
            <div className="button-action">
              <button className="btn-update" onClick={handleUpdateAvatar}>
                Update
              </button>
            </div>
          </div>
          <div className="right-section">
            <div className="field">
              <span className="label">Username</span>
              <input value={account?.username} />
            </div>
            <div className="field">
              <span className="label">Email:</span>
              <input type="text" value={account?.email} />
            </div>
            <div className="field">
              <span className="label">FullName:</span>
              <input type="text" value={account?.fullName} />
            </div>
            <div className="field">
              <span className="label">Phone:</span>
              <input type="text" value={account?.phone} />
            </div>
            <div className="field">
              <span className="label">Roles:</span>
              <input
                value={
                  account?.roles && account.roles.length > 0
                    ? account?.roles?.map((role) => role.name).join(", ")
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
