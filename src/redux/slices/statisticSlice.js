import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
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

const initialState = {
  statisticCategoryBySold: [],
  statisticCategoryByTotal: [],
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
      });
  },
});

export default statisticSlice.reducer;
