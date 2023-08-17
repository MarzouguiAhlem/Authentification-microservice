import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Import necessary utilities from Redux Toolkit
import axios from "./../httpClient"; // Import the custom axios instance for making HTTP requests

const initialState = {
  msg: "", // Initialize message state for displaying messages
  isLoading: true, // Initialize loading state
  msgType: "", // Initialize message type state
  resetPasswordStep: 1, // Initialize reset password step state
  currentPath: "", // Initialize current path state
};

const url = "//localhost:5000"; // Define the base URL for API requests

// Create an asynchronous thunk for setting the current path on the frontend
export const setCurrentPathFront = createAsyncThunk(
  "app/setCurrentPathFront",
  async (path) => {
    const response = await axios.post(`${url}/setCurrentPath`, { path }); // Send a POST request to set the current path
    return response.data; // Return the response data
  }
);

// Create a slice of the Redux store for app-related states
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMsg: (state, action) => {
      state.msg = action.payload; // Update the message state
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload; // Update the loading state
    },
    setMsgType: (state, action) => {
      state.msgType = action.payload; // Update the message type state
    },
    setResetPasswordStep: (state, action) => {
      state.resetPasswordStep = action.payload; // Update the reset password step state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentPathFront.fulfilled, (state, action) => {
      state.currentPath = action.payload; // Update the current path state when the setCurrentPathFront thunk is fulfilled
    });
  },
});

// Export the app-related actions and reducer from the slice
export const {
  setMsg,
  setIsLoading,
  setMsgType,
  setResetPasswordStep,
} = appSlice.actions;

export default appSlice.reducer; // Export the reducer for integration into the Redux store


