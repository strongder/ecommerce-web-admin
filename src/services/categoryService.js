import api from "../api";

export const fetchAllCategory = async (param) => {
  try {
    const response = await api.get("/categories",null, param ? { params: param }: {});
    return response.data.result;
  } catch (error) {
    console.error("get all category failed:", error.message);
  }
};

export const fetchParentCategory= async () => {
  try {
    const response = await api.get("/categories/parent");
    console
    return response.data.result;
  } catch (error) {
    console.error("get parent category failed:", error.message);
  }
}

export const addCategory = async (data) => {
  try {
    const response = await api.post(`/categories`, data);
    return response.data.result;
  } catch (error) {
    console.error("get category by id failed:", error.message);
  }
};

export const updateCategory = async ({categoryId, data}) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, data);
    return response.data.result;
  } catch (error) {
    console.error("update category failed:", error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("delete category failed:", error.message);
  }
}

export const fetchSubCategory = async () => {
  try {
    const response = await api.get(`/categories/subCategory`);
    return response.data.result;
  } catch (error) {
    console.error("get sub category failed:", error.message);
  }
}