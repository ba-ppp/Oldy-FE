import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'api/auth';

export type UserProfileReducer = {
    email: string;
    name: string;
    username: string;
    loading: boolean;
    error: string;
};

interface Login {
    username: string;
    password: string;
}

export const getLogin: any = createAsyncThunk(
    'profile/getLogin',
    async (params: Login) => {
        const profile = await login(params);
        return profile;
    }
);

const userProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        email: '',
        name: '',
        username: '',
        loading: false,
        error: '',
    } as UserProfileReducer,
    reducers: {
        addProfile: (state: UserProfileReducer, action) => {
            const { email, name, username } = action.payload;
            const newState = state;
            newState.email = email;
            newState.name = name;
            newState.username = username;
            return newState;
        },
    },
    extraReducers: {
        [getLogin.pending]: (state) => {
            state.loading = true;
        },
        [getLogin.rejected]: (state) => {
            state.loading = false;
            state.error = 'Server has downed';
        },
        [getLogin.fulfilled]: (state) => {
            state.loading = false;
        },
    },
});

export const { addProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
