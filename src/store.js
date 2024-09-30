import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./redux/slices/userSlice";
import authReducer from "./redux/slices/authSlice";
import productReducer from "./redux/slices/productSlice";
import orderReducer from "./redux/slices/orderSlice";
import notificationReducer from "./redux/slices/notificationSlice";
import categoryReducer from "./redux/slices/categorySlice";
import paymentReducer from "./redux/slices/paymentSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: usersReducer,
    auth: authReducer,
    orders: orderReducer,
    categories: categoryReducer,
    notifications: notificationReducer,
    payments: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra tuần tự hóa
    }),
});
