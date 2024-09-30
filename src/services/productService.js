import api from "../api";

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("get product by id failed:", error.message);
  }
};

export const fetchAllProduct = async (param) => {
    try {
      const response = await api.get(`/products`, param ? { params: param } : {});  
      return  response.data.result;
    } catch (error) {
      console.error("get all product failed:", error.message);
    }
};

export const addProduct = async (data) => {
    try {
      const response = await api.post(`/products`, data);
      return  response.data.result;
    } catch (error) {
      console.error("get all product failed:", error.message);
    }
};
export const updateProduct = async ({ id, data }) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data.result;
  } catch (error) {
    console.error("update product failed:", error.message);
  }
};
export const deleteProduct = async (productId) => {
    try {
      const response = await api.delete(`/products/${productId}`, data);
      return  response.data.result;
    } catch (error) {
      console.error("get all product failed:", error.message);
    }
};
