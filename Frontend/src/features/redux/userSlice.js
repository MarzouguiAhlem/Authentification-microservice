import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../httpClient";
import { setMsg, setMsgType, setResetPasswordStep } from "./appSlice";
import { absolutePaths, relativePaths } from "../../navigation";

const url = "//localhost:5000";

const initialState = {
  user: {
    email: "",
    name: "",
    role: "",
    adress: "",
    isVerified : false,
    isLoggedIn: false,
  },
  sessionLoading:true,
  accessToken : "",
  refreshToken : ""
};

export const resendConfirmationCode = createAsyncThunk(
  "user/resendConfirmationCode",
  async(firstParam, thunkAPI)=>{
    try{
      const resp = await axios.post(`${url}/user/sendConfirmationCode`);
      thunkAPI.dispatch(setMsg("verification code sent!"));
      thunkAPI.dispatch(setMsgType("info"));
      return resp.data
    }
    catch(error){
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error)
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (props, thunkAPI) => {
    const {user,navigate} = props
    try {
      const resp = await axios.post(`${url}/user/login`, user);
      if(!resp.data.current_user.isVerified){
        thunkAPI.dispatch(setMsg("please verify your account, check your email!"));
        thunkAPI.dispatch(setMsgType("warning"));
        navigate(relativePaths.verifyEmail)
      }
      else{
        thunkAPI.dispatch(setMsg("logged in successfully"));
        thunkAPI.dispatch(setMsgType("success"));
        if(resp.data.current_user.role === "admin"){navigate(relativePaths.adminDashboard)}
        else{navigate(relativePaths.userDashboard)}
      }
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (props, thunkAPI) => {
    const {user, navigate} = props
    try {
      const resp = await axios.post(`${url}/user/signup`, user); 
      thunkAPI.dispatch(setMsg("Signup successfully"));
      thunkAPI.dispatch(setMsgType("success"));
      thunkAPI.dispatch(setMsg(resp.data.msg)); 
      thunkAPI.dispatch(setMsgType("success"));
      console.log(resp.data);
      if(resp.data.msg === "check your email!"){
        navigate(absolutePaths.verifyEmail)
      }
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "user/verifyCode",
  async (code, thunkAPI) => {
    try {
      console.log(code)
      const resp = await axios.post(`${url}/user/verifyEmail`, code);
      thunkAPI.dispatch(setMsg("Email verified, Congrats!"));
      thunkAPI.dispatch(setMsgType("success"));
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error);
    }
  }
);

export const getSessionInfo = createAsyncThunk(
  "user/getSessionInfo",
  async (firstParam, thunkAPI) => {
    try{
      // const resp = await axios.get("//localhost:5000/@me");
      const resp = await axios.get(`${url}/@me`) 
      return resp.data
    }
    catch (error){
      console.log(error)
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (firstParam, thunkAPI) => {
    try{
      console.log("thunkAPI.getState.user.accessToken")
      console.log(thunkAPI.getState().user.accessToken)
      const resp = await axios.get(`${url}/user/signout`,{
        headers: {
          'Authorization': `Bearer ${thunkAPI.getState().user.accessToken}` 
        }
      })
      thunkAPI.dispatch(setMsg("logged out successfully"));
      thunkAPI.dispatch(setMsgType("success"));
      return resp.data
    }
    catch (error){
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error)
    }
  }
);

export const resetPasswordStep1 = createAsyncThunk(
  "user/resetPasswordStep1",
  async(email, thunkAPI)=>{
    try{
      const resp = await axios.post(`${url}/resetPasswordStep1`,email);
      thunkAPI.dispatch(setMsg("verification code sent!"));
      thunkAPI.dispatch(setMsgType("success"));
      thunkAPI.dispatch(setResetPasswordStep(2))
      return resp.data
    }
    catch(error){
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error)
    }
  }
);

export const resetPasswordStep2 = createAsyncThunk(
  "user/resetPasswordStep2",
  async(code, thunkAPI)=>{
    try{
      const resp = await axios.post(`${url}/resetPasswordStep2`,code);
      thunkAPI.dispatch(setMsg("code verified!"));
      thunkAPI.dispatch(setMsgType("success"));
      thunkAPI.dispatch(setResetPasswordStep(3))
      return resp.data
    }
    catch(error){
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error)
    }
  }
);

export const resetPasswordStep3 = createAsyncThunk(
  "user/resetPasswordStep3",
  async(password, thunkAPI)=>{
    try{
      const resp = await axios.post(`${url}/resetPasswordStep3`,password);
      thunkAPI.dispatch(setMsg(resp.data.msg));
      thunkAPI.dispatch(setMsgType("success"));
      return resp.data
    }
    catch(error){
      thunkAPI.dispatch(setMsg(error.response.data.msg));
      thunkAPI.dispatch(setMsgType("error"));
      console.log(error)
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessTokenFromSessionStorage: (state, action) => {
      state.accessToken = sessionStorage.getItem("accessToken") || ""
    },
    setRefreshTokenFromSessionStorage: (state, action) => {
      state.refreshToken = sessionStorage.getItem("refreshToken") || ""
    },
    setName:(state,action) => {
      state.user.name = action.payload
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.sessionLoading = true
      console.log("pending login");
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log("fulfilled login");
      if (action.payload) {
        console.log("login response");
        console.log(action.payload);
        state.user.email = action.payload.current_user.email;
        state.user.role = action.payload.current_user.role;
        state.user.isVerified = action.payload.current_user.isVerified;
        state.user.name = action.payload.current_user.name;
        state.user.adress = action.payload.current_user.adress;
        state.user.isLoggedIn = action.payload.logged_in;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        sessionStorage.setItem("accessToken", action.payload.access_token);
        sessionStorage.setItem("refreshToken", action.payload.refresh_token);
      }
      state.sessionLoading = false
    },
    [userLogin.rejected]: (state) => {
      console.log("rejected login");
      state.sessionLoading = false
    },

    [userSignup.pending]: (state) => {
      console.log("pending signup");
    },
    [userSignup.fulfilled]: (state, action) => {
        console.log("fulfilled signup");
        if (action.payload) {
          console.log("login respnse");
          console.log(action.payload);
          state.user.email = action.payload.current_user.email;
          state.user.role = action.payload.current_user.role;
          state.user.name = action.payload.current_user.name;
          state.user.isVerified = action.payload.current_user.isVerified;
          state.user.adress = action.payload.current_user.adress;
          state.user.isLoggedIn = false;
      }
    },
    [userSignup.rejected]: (state) => {
      console.log("rejected signup");
    },

    [verifyCode.pending]: (state) => {
      console.log("pending verify code");
    },
    [verifyCode.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("verify code response");
      console.log(action.payload);
      state.user.isLoggedIn = true
      state.user.isVerified = action.payload.current_user.isVerified;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      sessionStorage.setItem("accessToken", action.payload.access_token);
      sessionStorage.setItem("refreshToken", action.payload.refresh_token);
    },
    [verifyCode.rejected]: (state) => {
      console.log("rejected verify code");
    },

    [getSessionInfo.pending]: (state) => {
      console.log("pending session");
    },
    [getSessionInfo.fulfilled]: (state, action) => {
      console.log("fulfilled");
      console.log("session response");
      console.log(action.payload);
      if (action.payload){
        state.user.email = action.payload.current_user.email
        state.user.name = action.payload.current_user.name
        state.user.role = action.payload.current_user.role
        state.user.isVerified = action.payload.current_user.isVerified
        state.user.adress = action.payload.current_user.adress;
        state.user.isLoggedIn = action.payload.logged_in;
      }
      state.sessionLoading = false
      // return state

    },
    [getSessionInfo.rejected]: (state) => {
      console.log("rejected");
    },
    [logout.pending]: (state) => {
      console.log("pending logout");
    },
    [logout.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("logout resp");
      console.log(action.payload);
      state.user = {
        email: "",
        name: "",
        role: "",
        adress: "",
        isVerified : false,
        isLoggedIn: false,
      }

      state.accessToken = "";
      state.refreshToken = "";
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    [logout.rejected]: (state) => {
      console.log("rejected");
    },
    [resendConfirmationCode.pending]: (state) => {
      console.log("pending resendConfirmationCode");
    },
    [resendConfirmationCode.fulfilled]: (state, action) => {
      //   console.log("fulfilled");
      console.log("resendConfirmationCode resp");
      console.log(action.payload);
    },
    [resendConfirmationCode.rejected]: (state) => {
      console.log("rejected resendConfirmationCode");
    },
    [resetPasswordStep1.pending]: (state) => {
      console.log("pending resetPasswordStep1");
    },
    [resetPasswordStep1.fulfilled]: (state, action) => {
      console.log("resetPasswordStep1 resp");
      console.log(action.payload);
    },
    [resetPasswordStep1.rejected]: (state) => {
      console.log("rejected resetPasswordStep1");
    },

  },
});

export const { login, setSignupEmail,setAccessTokenFromSessionStorage, setRefreshTokenFromSessionStorage,setName } = userSlice.actions;

export default userSlice.reducer;
