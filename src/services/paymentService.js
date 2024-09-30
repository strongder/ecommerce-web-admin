import api from "../api";

export const fetchAllPayment = async () => {
  try {
    const response = await api.get(`/payments`);
    return response.data.result;
  } catch (error) {
    console.log("fetch all payment failed:", error);
  }
};

export const fetchPaymentByUser = async (userId) => {
  try {
    const response = await api.get(`/payments/${userId}`);
    return response.data.result;
  } catch (error) {
    console.log("fetch payment by user failed:", error);
  }
};
