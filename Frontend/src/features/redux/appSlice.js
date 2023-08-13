import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../httpClient";

const initialState = {
  msg: "",
  isLoading: true,
  msgType: "",
  resetPasswordStep: 1,
  currentPath: "", // Add the currentPath property to the initial state
};

const url = "//localhost:5000";

export const setCurrentPathFront = createAsyncThunk(
  "app/setCurrentPathFront",
  async (path) => {
    // Perform any necessary async actions here (e.g., API calls)
    // For example:
    const response = await axios.post(`${url}/setCurrentPath`, { path });
    return response.data;
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMsg: (state, action) => {
      state.msg = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMsgType: (state, action) => {
      state.msgType = action.payload;
    },
    setResetPasswordStep: (state, action) => {
      state.resetPasswordStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentPathFront.fulfilled, (state, action) => {
      state.currentPath = action.payload;
    });
  },
});

export const {
  setMsg,
  setIsLoading,
  setMsgType,
  setResetPasswordStep,
} = appSlice.actions;

export default appSlice.reducer;



