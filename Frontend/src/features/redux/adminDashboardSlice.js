import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../httpClient";
import { setMsg, setMsgType } from "./appSlice";
import { setName } from "./userSlice";

const initialState = {
  users: [],
  messages:[],
};

const url = "//localhost:5000";

export const getAllUsers = createAsyncThunk(
  "adminDashboard/getAllUsers",
  async (firstParam, thunkAPI) => {
    try {
      const resp = await axios.get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserByEmail = createAsyncThunk(
  "adminDashboard/deleteUserByEmail",
  async (userEmail, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${url}/user/deleteByEmail/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddUser = createAsyncThunk(
  "adminDashboard/addUser",
  async (user, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState().user.accessToken);
      const resp = await axios.post(`${url}/user/addUser`, user, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
        },
      });
      thunkAPI.dispatch(setMsg("user added successfully"));
      thunkAPI.dispatch(setMsgType("success"));
      thunkAPI.dispatch(getAllUsers());
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const changeName = createAsyncThunk(
  "adminDashboard/changeName",
  async (newName, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState().user.accessToken);
      const resp = await axios.put(`${url}/user/changeName`, newName, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
        },
      });
      thunkAPI.dispatch(setName(resp.data.name));
      thunkAPI.dispatch(setMsg("Name changed successfully"));
      thunkAPI.dispatch(setMsgType("success"));
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "adminDashboard/changePassword",
  async (passwords, thunkAPI) => {
    try {
      const id = thunkAPI.getState().user.user._id;
      // console.log(thunkAPI.getState().user.accessToken);
      const resp = await axios.put(`${url}/user/changePassword`, passwords, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
        },
      });
      thunkAPI.dispatch(setMsg("Password changed successfully"));
      thunkAPI.dispatch(setMsgType("success"));
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "adminDashboard/sendMessage",
  async (message, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/sendMessage`, message);
      thunkAPI.dispatch(setMsg("Message sent successfully"));
      thunkAPI.dispatch(setMsgType("success"));
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "adminDashboard/getAllMessages",
  async (firstParam, thunkAPI) => {
    try {
      const resp = await axios.get(`${url}/getAllMessages`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setMessageIsReaden = createAsyncThunk(
  "adminDashboard/setMessageIsReaden",
  async (body, thunkAPI) => {
    try {
      const resp = await axios.put(`${url}/setMessageIsReaden`, body ,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
        },
      });
      thunkAPI.dispatch(getAllMessages())
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "adminDashboard/deleteMessage",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${url}/deleteMessage/${id}`,
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.accessToken}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      // console.log("pending getAllUsers");
    },
    [getAllUsers.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      // console.log("getAllUsers resp");
      // console.log(action.payload);
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state) => {
      console.log("rejected getAllUsers");
    },
    [AddUser.pending]: (state) => {
      console.log("pending AddUser");
    },
    [AddUser.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      // console.log("AddUser resp");
      // console.log(action.payload);
    },
    [AddUser.rejected]: (state) => {
      console.log("rejected AddUser");
    },
    [deleteUserByEmail.pending]: (state) => {
      console.log("pending deleteUserByEmail");
    },
    [deleteUserByEmail.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("deleteUserByEmail resp");
      console.log(action.payload);
      const updatedUsers = state.users.filter(
        (user) => user.email !== action.payload.email
      );
      state.users = updatedUsers;
    },
    [deleteUserByEmail.rejected]: (state) => {
      console.log("rejected deleteUserByEmail");
    },
    [changeName.pending]: (state) => {
      console.log("pending changeName");
    },
    [changeName.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("changeName resp");
      console.log(action.payload);
    },
    [changeName.rejected]: (state) => {
      console.log("rejected changeName");
    },
    [changePassword.pending]: (state) => {
      console.log("pending changePassword");
    },
    [changePassword.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("changePassword resp");
      console.log(action.payload);
    },
    [changePassword.rejected]: (state) => {
      console.log("rejected changePassword");
    },

    [sendMessage.pending]: (state) => {
      console.log("pending sendMessage");
    },
    [sendMessage.fulfilled]: (state, action) => {
      console.log("sendMessage resp");
      console.log(action.payload);
    },
    [sendMessage.rejected]: (state) => {
      // console.log("rejected sendMessage");
    },

    [getAllMessages.pending]: (state) => {
      // console.log("pending getAllMessages");
    },
    [getAllMessages.fulfilled]: (state, action) => {
      // console.log("getAllMessages resp");
      // console.log(action.payload);
      state.messages = action.payload
    },
    [getAllMessages.rejected]: (state) => {
      // console.log("rejected getAllMessages");
    },
    [deleteMessage.pending]: (state) => {
      console.log("pending deleteMessage");
    },
    [deleteMessage.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("deleteMessage resp");
      console.log(action.payload);
      const updatedMessages = state.messages.filter(
        (message) => message._id !== action.payload.id
      );
      state.messages = updatedMessages;
    },
    [deleteMessage.rejected]: (state) => {
      console.log("rejected deleteMessage");
    },
  },
});

export const {} = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
