import { createSlice } from "@reduxjs/toolkit";

export type CodeReducer = {
  codeOTP: string,
  token: string
}

const codeSlice = createSlice({
  name: "codeApply",
  initialState: {
    codeOTP: "",
    token: "",
  } as CodeReducer,
  reducers: {
    addcode: (state: CodeReducer, action): void => {
      state.codeOTP = action.payload;
    },
    setToken: (state: CodeReducer, action): void => {
      state.token = action.payload;
    },
  },
});

export const { addcode, setToken } = codeSlice.actions;

export default codeSlice.reducer;
