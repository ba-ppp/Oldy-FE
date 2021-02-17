import { createSlice } from "@reduxjs/toolkit";

export type CodeState = {
  codeOTP: string,
  token: string
}

const codeSlice = createSlice({
  name: "codeApply",
  initialState: {
    codeOTP: "",
    token: "",
  } as CodeState,
  reducers: {
    addcode: (state: CodeState, action): void => {
      state.codeOTP = action.payload;
    },
    setToken: (state: CodeState, action): void => {
      state.token = action.payload;
    },
  },
});

export const { addcode, setToken } = codeSlice.actions;

export default codeSlice.reducer;
