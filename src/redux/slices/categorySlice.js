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
  async ({ categoryId, data }, thunkAPI) => {
    const response = await categoryService.updateCategory({ categoryId, data });
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

export const fetchParentCategory = createAsyncThunk(
  "category/fetchParentCategory",
  async () => {
    const response = await categoryService.fetchParentCategory();
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteProduct",
  async (id) => {
    const response = await categoryService.deleteCategory(id);
    return response;
  }
);

export const fetchSubCategory = createAsyncThunk(
  "category/fetchSubCategory",
  async () => {
    const response = await categoryService.fetchSubCategory();
    return response;
  }
);
const initialState = {
  listCategory: [],
  cateygory: {},
  subCategories: [],
  parentCategories: [],
  totalElements: 0,
  loading: "idle",
};

// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listCategory?.content.push(action.payload);
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listCategory.content = state.listCategory.content.map(
          (category) =>
            category.id === action.payload.id ? action.payload : category
        );
      })
      .addCase(fetchAllCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listCategory = action.payload;
      })
      .addCase(fetchParentCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchParentCategory.fulfilled, (state, action) => {
        state.loading = "successed";
        state.parentCategories = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listCategory.content = state.listCategory.content.filter(
          (category) => category?.id !== action.payload?.id
        );
      })
      .addCase(fetchSubCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.loading = "successed";
        state.subCategories = action.payload;
      });
  },
});

export const { updateListCategory } = categorySlice.actions;
export default categorySlice.reducer;
