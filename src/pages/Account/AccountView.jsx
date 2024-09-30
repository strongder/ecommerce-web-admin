import React, { useState, useEffect } from "react";
import "./AccountView.scss"; // Import CSS cho trang
import Pagination from "../../components/Pagination/Pagination"; // Import Pagination component
import { Link } from "react-router-dom";
import {
  fetchAddressByUserId,
  fetchAllUser,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <div className="account-management">
      <h1>Quản lý Tài Khoản</h1>

      <div className="search-filter">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <table className="account-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUser?.content &&
            listUser.content.map((account, index) => (
              <tr key={account.id}>
                <td>{(currentPage - 1) * param.pageSize + index + 1}</td>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.role}</td>
                <td>{account.status}</td>
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
    </div>
  );
};

export default AccountView;
