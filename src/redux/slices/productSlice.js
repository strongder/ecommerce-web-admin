import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productService from "../../services/productService";

// Định nghĩa các async thunks
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await productService.fetchProductById(id);
    return response;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (param) => {
    const response = await productService.fetchAllProduct(param);
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    const response = await productService.addProduct(data);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const product = await productService.updateProduct({ id, data });
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (data) => {
    const response = await productService.deleteProduct(data);
    return response;
  }
);

// Khởi tạo state
const initialState = {
  product: {},
  listProduct: [],
  totalPage: 0,
  loading: "idle",
  error: null,
};

// Tạo slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = "idle";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = "idle";
        state.listProduct = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = "idle";
        state.listProduct.content.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = "idle";
        state.listProduct = state.listProduct.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
