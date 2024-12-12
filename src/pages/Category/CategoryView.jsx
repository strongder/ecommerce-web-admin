import React, { useState, useRef, useEffect } from "react";
import "./CategoryView.scss";
import Pagination from "../../components/Pagination/Pagination";
import {
  fetchAllCategory,
  fetchParentCategory,
  updateCategory,
  addCategory,
  deleteCategory,
} from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import { toast } from "react-toastify";

const CategoryView = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    parentId: "",
  });
  const [editCategory, setEditCategory] = useState({
    id: "",
    name: "",
    image: "",
    parentId: "",
  });
  const addDialogRef = useRef(null);
  const updateDialogRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khai báo useNavigate
  const { listCategory, loading, parentCategories } = useSelector(
    (state) => state.categories
  );
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const param = {
    pageNum: currentPage,
    pageSize: 10,
    sortDir: null,
    sortBy: null,
  };

  useEffect(() => {
    dispatch(fetchParentCategory());
  }, [dispatch]);

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
      const totalPages = Math.ceil(
        (listCategory.totalElements + 1) / param.pageSize
      );
      setCurrentPage(totalPages);
      setNewCategory({ name: "", image: "" });
      addDialogRef.current.close(); // Đóng dialog thêm danh mục
    } catch (error) {
      console.error("Thêm danh mục thất bại:", error);
    }
  };

  const handleImageChange = (e, setData) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file); // Chuyển đổi file hình thành Base64
    }
  };

  const handleDeleteCategory = async (id) => {
    await dispatch(deleteCategory(id)).unwrap();
    toast.success("Xóa danh mục thành công");
  };

  const handleOpendialogUpdate = (category) => {
    setEditCategory({
      id: category.id,
      name: category.name,
      image: category.image,
      parentId: category.parentId,
    });
    updateDialogRef.current.showModal();
  };

  const handleUpdateCategory = async () => {
    const categoryId = editCategory.id;
    delete editCategory.id;
    await dispatch(updateCategory({ categoryId, data: editCategory })).unwrap();
    updateDialogRef.current.close(); // Đóng dialog update danh mục
    toast.success("Cập nhật danh mục thành công");
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

  if (loading === "idle") {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-view">
      <h1>Quản Lý Danh Mục</h1>
      <div className="search-bar">
        <button onClick={() => addDialogRef.current.showModal()}>
          Thêm danh mục
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

          <select
            name="parentId"
            value={newCategory.parentId}
            onChange={(e) =>
              setNewCategory({ ...newCategory, parentId: e.target.value })
            }
          >
            <option value="">Chọn danh mục cha</option>
            {parentCategories &&
              parentCategories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          <label htmlFor="inputNewImage">Chọn ảnh</label>
          <input
            id="inputNewImage"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setNewCategory)}
          />
          {newCategory.image && (
            <img
              src={newCategory.image}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
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
          {listCategory?.content &&
            listCategory?.content?.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category?.name}</td>
                <td>
                  {category?.image && (
                    <img
                      src={category.image}
                      alt="Category"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>{new Date(category?.createAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleOpendialogUpdate(category)}>
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
      {
        <dialog ref={updateDialogRef} className="add-category-dialog">
          <div className="dialog-content">
            <h2>Update category</h2>
            <input
              type="text"
              name="name"
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  name: e.target.value,
                })
              }
              placeholder="Tên danh mục"
            />

            <select
              name="parentId"
              value={editCategory.parentId}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  parentId: e.target.value,
                })
              }
            >
              {parentCategories &&
                parentCategories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>

            <label htmlFor="inputImage">Chọn ảnh</label>
            <input
              id="inputImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setEditCategory)}
            />
            {editCategory.image && (
              <img
                src={editCategory.image}
                alt="Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <div className="dialog-buttons">
              <button onClick={handleUpdateCategory}>Update</button>
              <button onClick={() => updateDialogRef.current.close()}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      }
    </div>
  );
};

export default CategoryView;
