import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as categoryService from "../../services/categoryService";

// First, create the thunk
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data, thunkAPI) => {
    const response = await categoryService.addCategory(data);
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (categoryId, data, thunkAPI) => {
    const response = await categoryService.addCategory(categoryId, data);
    return response;
  }
);

export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async (param) => {
    const response = await categoryService.fetchAllCategory(param);
    return response;
  }
);
const initialState = {
  listCategory: [],
  cateygory: {},
  totalElements: 0,
  loading: "idle",
};

// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateListCategory: (state, action) => {
      state.listCategory = action.payload;
      state.totalElements = action.payload.totalElements;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = "idle";
        state.listCategory?.content.push(action.payload);
        state.totalElements +=1;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = "idle";
        state.listCategory = state.listCategory.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      })
      .addCase(fetchAllCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.loading = "idle";
        state.listCategory = action.payload;
        state.totalElements = action.payload.totalElements
      });
  },
});

export const { updateListCategory } = categorySlice.actions;
export default categorySlice.reducer;
