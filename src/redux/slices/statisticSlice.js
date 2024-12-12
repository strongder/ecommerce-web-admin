import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import * as productService from "../../services/productService";
export const fetchStatisticCategoryBySold = createAsyncThunk(
  "statistics/fetchStatisticCategoryBySole",
  async () => {
    const response = await api.get("/statistics/category/category-sold");
    return response.data;
  }
);

export const fetchStatisticCategoryByTotal = createAsyncThunk(
  "statistics/fetchStatisticCategoryByTotal",
  async () => {
    const response = await api.get("/statistics/category/category-total");
    return response.data;
  }
);

export const fetchStatisticRenevueByMonth = createAsyncThunk(
  "statistics/fetchStatisticRenevueByMonth",
  async (year) => {
    const response = await api.get(`/statistics/revenue/month/${year}`);
    return response.data;
  }
);
export const fetchCustomerOverview = createAsyncThunk(
  "statistics/fetchCustomerOverview",
  async (year) => {
    const response = await api.get(`/statistics/customer/overview`);
    return response.data;
  }
);
export const fetchOrderOverview = createAsyncThunk(
  "statistics/fetchOrderOverview",
  async ({ startDate, endDate }) => {
    const response = await api.get(`/statistics/order/overview`, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  }
);

export const fetchProductBestSale = createAsyncThunk(
  "statistics/fetchOrderOverview",
  async () => {
    const response = await api.get(`/statistics/order/overview`);
    return response.data;
  }
);

export const fetchBestSellingProducts = createAsyncThunk(
  "statistics/fetchBestSellingProducts",
  async (param) => {
    const response = await productService.fetchProductTopSale(param);
    return response;
  }
);



const initialState = {
  statisticCategoryBySold: [],
  statisticCategoryByTotal: [],
  statisticRenevueByMonth: [],
  customerOverview:{},
  orderOverview:{},
  bestSellingProducts:[],
  error: null,
};

const statisticSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticCategoryBySold.fulfilled, (state, action) => {
        state.statisticCategoryBySold = action.payload;
      })
      .addCase(fetchStatisticCategoryBySold.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchStatisticCategoryByTotal.fulfilled, (state, action) => {
        state.statisticCategoryByTotal = action.payload;
      })
      .addCase(fetchStatisticCategoryByTotal.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchStatisticRenevueByMonth.fulfilled, (state, action) => {
        state.statisticRenevueByMonth = action.payload;
      })
      .addCase(fetchOrderOverview.fulfilled, (state, action) => {
        state.orderOverview = action.payload;
      })
      .addCase(fetchCustomerOverview.fulfilled, (state, action) => {
        state.customerOverview = action.payload;
      })
      .addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
        state.bestSellingProducts = action.payload;
      });
  },
});

export default statisticSlice.reducer;
