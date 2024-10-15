import api from "../api";

export const fetchNotificationByUser = async () => {
  try {
    const response = await api.get(`/notifications`);
    return response.data.result;
  } catch (error) {
    console.error("Failed to fetch notification", error);
  }
};

export const getUnreadNotification = async () => {
  try {
    const response = await api.get("/notifications/unread-count");
    return response.data.result;
  } catch (error) {
    console.log("Failed to fetch unread notification", error);
  }
};
