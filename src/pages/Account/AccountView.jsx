import React, { useState, useEffect } from "react";
import "./AccountView.scss"; // Import CSS cho trang
import Pagination from "../../components/Pagination/Pagination"; // Import Pagination component
import { Link } from "react-router-dom";
import {
  fetchAddressByUserId,
  fetchAllUser,
  addAccount, // Hàm dispatch để thêm người dùng
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Mở/đóng Dialog
  const [newAccount, setNewAccount] = useState({
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN", // Mặc định role là USER
  });

  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.users);

  const param = {
    pageNum: currentPage,
    pageSize: 10,
    sortDir: null,
    sortBy: null,
  };

  useEffect(() => {
    const newParam = {
      ...param,
      pageNum: currentPage - 1,
    };
    dispatch(fetchAllUser(newParam));
  }, [dispatch, currentPage]);

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

  const totalPages = listUser?.totalPages;

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thêm tài khoản
  const handleAddAccount = () => {
    if (newAccount.password !== newAccount.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    const accountData = {
      email: newAccount.email,
      phone: newAccount.phone,
      username: newAccount.username,
      password: newAccount.password,
      roles: [newAccount.role],
    };
    dispatch(addAccount(accountData)); // Dispatch thêm tài khoản mới
    // Đóng Dialog và reset form
    closeDialog();
    setNewAccount({
      phone: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "ADMIN",
    });
  };

  return (
    <div className="account-management">
      <h1>Quản lý Tài Khoản</h1>
      <div className="account-header">
        <button className="add-account-button" onClick={openDialog}>
          Thêm Tài Khoản
        </button>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <table className="account-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.content &&
            listUser.content.map((account, index) => (
              <tr key={account.id}>
                <td>{(currentPage - 1) * param.pageSize + index + 1}</td>
                <td>{account?.username}</td>
                <td>{account?.email}</td>
                <td>
                  {account.roles && account.roles.length > 0
                    ? account.roles.map((role) => role.name).join(", ")
                    : "N/A"}
                </td>
                <td>
                  <button className="action-button detail-button">
                    <Link to={`/accounts/${account.id}`}>DETAIL</Link>
                  </button>
                  <button className="action-button delete-button">
                    DELETE
                  </button>
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

      {/* Dialog Thêm Tài Khoản */}
      {/* Dialog Dialog */}
      {isDialogOpen  && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Thêm Tài Khoản Mới</h2>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newAccount.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={newAccount.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={newAccount.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={newAccount.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                value={newAccount.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Role</label>
              <select
                name="role"
                value={newAccount.role}
                onChange={handleInputChange}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="dialog-actions">
              <button onClick={handleAddAccount}>Thêm</button>
              <button
                className="cancel-button"
                onClick={closeDialog}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountView;
