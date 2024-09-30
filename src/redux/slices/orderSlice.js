import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as orderService from "../../services/orderService";

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    const response = await orderService.fetchOrderById(id);
    return response;
  }
);
export const fetchAllOrder = createAsyncThunk(
  "order/fetchAllOrder",
  async (param) => {
    const response = await orderService.fetchAllOrder(param);
    return response;
  }
);
export const acceptOrder = createAsyncThunk(
  "order/acceptOrder",
  async (orderId) => {
    const response = await orderService.acceptOrder(orderId);
    return response;
  }
);
export const fetchOrderByUserId = createAsyncThunk(
  "order/fetchOrderByUserId",
  async (orderId, param) => {
    const response = await orderService.fetchOrderByUserId(orderId, param);
    return response;
  }
);

const initialState = {
  order: {},
  listOrderByUser: [],
  listOrder: [],
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
    builder.addCase(fetchOrderById.pending, (state) => {
        state.loading = "loading";
    }).addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = "successed";
        state.order = action.payload;
    }).addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listOrder = action.payload;
    }).addCase(acceptOrder.pending, (state) => {
        state.loading = "loading";
    }).addCase(acceptOrder.fulfilled, (state, action) => {
        state.loading = "successed";
        state.order = action.payload;
    }).addCase(fetchOrderByUserId.pending, (state) => {
        state.loading = "loading";
    }).addCase(fetchOrderByUserId.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listOrderByUser = action.payload;
    });
    }
});

export default orderSlice.reducer; 