import api from "../api";

export const fetchAllCategory = async (param) => {
  try {
    const response = await api.get("/categories", { params: param });
    return response.data.result;
  } catch (error) {
    console.error("get all category failed:", error.message);
  }
};

export const addCategory = async (data) => {
  try {
    const response = await api.post(`/categories`, data);
    return response.data.result;
  } catch (error) {
    console.error("get category by id failed:", error.message);
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data.result;
  } catch (error) {
    console.error("update category failed:", error.message);
  }
};
