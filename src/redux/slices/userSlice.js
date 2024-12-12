import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userService from "../../services/userService";

// First, create the thunk
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId, thunkAPI) => {
    const response = await userService.fetchUserById(userId);
    return response;
  }
);
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const response = await userService.fetchCurrentUser();
    return response;
  }
);

export const fetchAllUser = createAsyncThunk(
  "users/fetchAllUser",
  async (param) => {
    const response = await userService.fetchAllUser(param);
    return response;
  }
);

export const fetchAddressByUserId = createAsyncThunk(
  "users/fetchAddressByUserId",
  async (userId) => {
    const response = await userService.fetchAddressByUserId(userId);
    return response;
  }
);
export const updateAvatar = createAsyncThunk(
  "users/updateAvatar",
  async ({avatar, id}) => {
    const response = await userService.updateAvatar({avatar, id});
    return response;
  }
);

export const addAccount = createAsyncThunk(
  "users/addAccount",
  async (data) => {
    const response = await userService.addAccount(data);
    return response;
  }
);



const initialState = {
  listUser: [],
  user: {},
  listAddressByUser: [],
  currentUser: {},
  loading: "idle",
};

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = "successed";
        state.user = action.payload;
      })
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listUser = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = "loadaing";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = "successed";
        state.currentUser = action.payload;
      })
      .addCase(fetchAddressByUserId.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAddressByUserId.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listAddressByUser = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = "successed";
        state.currentUser.avatar = action.payload;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.loading = "successed";
        state.listUser.content.push(action.payload);
      });
  },
});

export default usersSlice.reducer;
