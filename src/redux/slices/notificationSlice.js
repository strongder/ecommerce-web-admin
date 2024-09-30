import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as notificationService from "../../services/notificationService";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await notificationService.fetchNotificationByUser();
    return response;
  }
);

const initialState = {
  notifications: [],
  loading: 'idle',

};
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.loading = 'idle';
    });
  },
});

export default notificationSlice.reducer;