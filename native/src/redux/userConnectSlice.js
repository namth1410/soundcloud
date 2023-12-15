import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./configAPI";

const initialState = {
  userConnect: {},
  loading: false,
  error: "",
  success: false,
};

export const userConnectSlice = createSlice({
  name: "userConnect",
  initialState,
  reducers: {
    clearUserConnect: (state, action) => {
      return {
        userConnect: {},
        loading: false,
        error: "",
        success: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUserByUsername.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.userConnect = action.payload;
        state.loading = false;
        state.error = "";
        success = true;
      })
      .addCase(getUserByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = "Lấy người dùng connect lỗi";
        success = false;
      });
  },
});

export const getUserByUsername = createAsyncThunk(
  "author/getUserByUsername",
  async (info) => {
    try {
      const config = {
        params: {
          username: info.username,
        },
      };

      const response = await axios.get(
        `${BASE_URL}/api/Songs/getUserByUsername`,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy người dùng connect: ", error);
      console.error("Lỗi khi lấy người dùng connect: ", error.response.data);
      throw error;
    }
  }
);

export const { clearUserConnect } = userConnectSlice.actions;

export default userConnectSlice.reducer;
