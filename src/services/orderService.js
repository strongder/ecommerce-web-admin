import api from "../api";

export const fetchOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return  response.data.result;
  } catch (error) {
    console.error("Failed to fetch order", error.message);
  }
};

export const fetchAllOrder = async (param) => {
  try {
    const response = await api.get(`/orders`, param ? { params: param } : {});
    return response.data.result;
  } catch (error) {
    console.error("Failed to fetch order", error.message);
  }
};

export const acceptOrder = async (orderId) => {
  try {
    const response = await api.put(`/orders/accept-order/${orderId}`);
    return response.data.result;
  } catch (error) {
    console.error("Failed to accept order", error);
  }
};

export const fetchOrderByUserId = async (id, param) => {
    try {
        const response = await api.get(`/orders/user/${id}`, param ? { params: param } : {});
        return  response.data.result;
    } catch (error) {
        console.error("Failed to fetch order", error.message);
    }
    }
