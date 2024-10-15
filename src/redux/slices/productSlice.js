import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as productService from "../../services/productService";
import api from "../../api";

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
  "products/update",
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
export const fetchProductTopSale = createAsyncThunk(
  "product/fetchProductTopSale",
  async (param) => {
    const response = await productService.fetchProductTopSale(param);
    return response;
  }
);

export const fetchProductStatistic = createAsyncThunk(
  "product/fetchProductSatistic",
  async (param) => {
    const response = await productService.fetchProductStatistic(param);
    return response;
  }
);

export const getProductSold = createAsyncThunk(
  "product/getProductSold",
  async () => {
    try {
      const response = await api.get(`/products/total-sold`);
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getProductInStock = createAsyncThunk(
  "product/getProductInStock",
  async () => {
    try {
      const response = await api.get(`/products/total-in-stock`);
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);
// Khởi tạo state
const initialState = {
  product: {},
  listProduct: [],
  listProductTopSale: [],
  listProductStatistic: [],
  totalSold: 0,
  totalStock: 0,
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
      })
      .addCase(fetchProductStatistic.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listProductStatistic = action.payload;
      })
      .addCase(fetchProductTopSale.fulfilled, (state, action) => {
        state.listProductTopSale = action.payload;
      })
      .addCase(getProductSold.fulfilled, (state, action) => {
        state.totalSold = action.payload;
      })
      .addCase(getProductInStock.fulfilled, (state, action) => {
        state.totalStock = action.payload;
      });
  },
});

export default productSlice.reducer;
