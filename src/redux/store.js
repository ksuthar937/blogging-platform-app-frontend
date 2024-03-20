import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    title: "",
    description: "",
    imageURL: "",
  },
  reducers: {
    create(state) {
      state.isLogin = false;
    },
    delete(state) {
      state.isLogin = false;
    },
    edit(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;
export const blogActions = blogSlice.actions;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  blog: blogSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
