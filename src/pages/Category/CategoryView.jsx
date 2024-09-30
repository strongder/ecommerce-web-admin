import React, { useState, useRef, useEffect } from "react";
import "./CategoryView.scss";
import Pagination from "../../components/Pagination/Pagination";
import {
  addCategory,
  fetchAllCategory,
} from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryView = () => {
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });
  const [editingCategory, setEditingCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const addDialogRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { listCategory, loading } = useSelector((state) => state.categories);
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
    dispatch(fetchAllCategory(newParam));
  }, [dispatch, currentPage]);

  const handleAddCategory = async () => {
    try {
      await dispatch(addCategory(newCategory)).unwrap();
      const totalPages = Math.ceil((listCategory.totalElements + 1) / param.pageSize);
      setCurrentPage(totalPages);
      setNewCategory({ name: "", image: "" });
      addDialogRef.current.close(); // Đóng dialog thêm danh mục
    } catch (error) {
      console.error("Thêm danh mục thất bại:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCategory((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file); // Chuyển đổi file hình thành Base64
    }
  };

  const handleDeleteCategory = (id) => {};

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCategory = () => {
    // Update category logic here
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

  const totalPages = listCategory?.totalPages || 1;

  if (loading === "idel") {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-view">
      <h1>Quản Lý Danh Mục</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => addDialogRef.current.showModal()}>
          Thêm Danh Mục
        </button>
      </div>
      <dialog ref={addDialogRef} className="add-category-dialog">
        <div className="dialog-content">
          <h2>Thêm Danh Mục Mới</h2>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            placeholder="Tên danh mục"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Hàm để xử lý sự kiện chọn ảnh
          />
          {newCategory.image && (
            <img
              src={newCategory.image}
              alt="Preview"
              style={{ width: "100px", height: "100px" }} // Hiển thị ảnh xem trước
            />
          )}
          <div className="dialog-buttons">
            <button onClick={handleAddCategory}>Thêm</button>
            <button onClick={() => addDialogRef.current.close()}>Hủy</button>
          </div>
        </div>
      </dialog>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>CreateAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listCategory.content &&
            listCategory.content.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category?.name}</td>
                <td>
                  {category?.image && (
                    <img
                      src={category.image}
                      alt="Category"
                      style={{ width: "50px", height: "50px" }} // Hiển thị ảnh danh mục
                    />
                  )}
                </td>
                <td>{category?.createAt}</td>
                <td>
                  <button onClick={() => handleEditCategory(category)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Delete
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

export default CategoryView;
