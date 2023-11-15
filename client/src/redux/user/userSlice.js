// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//     },
//     signInSuccess: (state, action) => {
//       (state.currentUser = action.payload), (state.loading = false);
//       state.error = null;
//     },
//     singInFail: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { signInStart, signInSuccess, singInFail } = userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    userUpdateStart: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    userUpdateFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    deleteStart: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    logOutFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  singInStart,
  signInSuccess,
  signInFail,
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFail,
  deleteStart,
  deleteSuccess,
  deleteFail,
  logOutStart,
  logOutSuccess,
  logOutFail,
} = userSlice.actions;
export default userSlice.reducer;
