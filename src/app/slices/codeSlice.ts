import { createSlice } from "@reduxjs/toolkit";

export type CodeReducer = {
  codeOTP: string,
  token: string
}

const codeSlice = createSlice({
    name: "codeApply",
    initialState: {
        codeOTP: ""
    } as CodeReducer,
    reducers: {
        addcode: (state: CodeReducer, action): void => {
            // eslint-disable-next-line no-param-reassign
            state.codeOTP = action.payload;
        } 
    },
});

export const { addcode } = codeSlice.actions;

export default codeSlice.reducer;
