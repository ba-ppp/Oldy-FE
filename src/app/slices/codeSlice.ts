import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import forgot from 'api/auth/forgotPass';

export type CodeReducer = {
    codeOTP: string;
    token: string;
    error: string;
};

type Forget = {
    account: string;
};

export const getCode: any = createAsyncThunk(
    'codeForget/getCode',
    async (params: Forget) => {
        const data = await forgot(params);
        return data;
    }
);

const codeSlice = createSlice({
    name: 'codeForget',
    initialState: {
        codeOTP: '',
        error: '',
        token: '',
    } as CodeReducer,
    reducers: {
        addcode: (state: CodeReducer, action): void => {
            // eslint-disable-next-line no-param-reassign
            state.codeOTP = action.payload.code;
            state.token = action.payload.token;
        },
    },
    extraReducers: {
        [getCode.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getCode.fulfilled]: (state, action) => {
            state.error = '';
        },
    },
});

export const { addcode } = codeSlice.actions;

export default codeSlice.reducer;
