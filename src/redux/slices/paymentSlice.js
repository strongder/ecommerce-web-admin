import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as paymentService from "../../services/paymentService";

export const fetchPaymentByUser = createAsyncThunk(
  "payment/fetchPaymentById",
  async (id) => {
    const response = await paymentService.fetchPaymentByUser(id);
    return response;
  }
);

export const fetchAllPayment = createAsyncThunk(
  "payment/fetchAllPayment",
  async (param) => {
    const response = await paymentService.fetchAllPayment(param);
    return response;
  }
);

const initialState = {
  payment: {},
  listPayment: [],
  listPaymentByUser: [],
  loading: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPaymentByUser.pending, (state) => {
      state.loading = "loading";
    }).addCase(fetchPaymentByUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.payment = action.payload;
    }).addCase(fetchAllPayment.pending, (state) => {
      state.loading = "loading";
    }).addCase(fetchAllPayment.fulfilled, (state, action) => {
      state.loading = "idle";
      state.listPayment = action.payload;
    });
  },
});

export default paymentSlice.reducer;
