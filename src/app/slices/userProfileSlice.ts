import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register } from 'api/auth';

export type UserProfileReducer = {
    id: string;
    email: string;
    name: string;
    username: string;
    avt: string;
    loading: boolean;
    error: string;
};

interface Login {
    username: string;
    password: string;
}

interface Register {
    username: string;
    password: string;
    name: string;
    email: string;
}

export const getLogin: any = createAsyncThunk(
    'profile/getLogin',
    async (params: Login) => {
        const profile = await login(params);
        return profile;
    }
);

export const getRegister: any = createAsyncThunk(
    'profile/getRegister',
    async (params: Register) => {
        const profile = await register(params);
        return profile;
    }
);

const userProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        id: '',
        email: '',
        name: '',
        username: '',
        avt: '',
        loading: false,
        error: '',
    } as UserProfileReducer,
    reducers: {
        addProfile: (state: UserProfileReducer, action) => {
            const { email, name, username, avt, id } = action.payload;
            const newState = state;
            newState.id = id;
            newState.email = email;
            newState.name = name;
            newState.username = username;
            newState.avt = avt;
            return newState;
        },
        changeAvtURL: (state: UserProfileReducer, action) => {
            const { avt } = action.payload;
            const newState = { ...state };
            newState.avt = avt;
            return newState;
        },
    },
    extraReducers: {
        [getLogin.pending]: (state) => {
            state.loading = true;
        },
        [getLogin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getLogin.fulfilled]: (state) => {
            state.loading = false;
        },

        [getRegister.pending]: (state) => {
            state.loading = true;
        },
        [getRegister.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getRegister.fulfilled]: (state) => {
            state.loading = false;
        },
    },
});

export const { addProfile, changeAvtURL } = userProfileSlice.actions;

export default userProfileSlice.reducer;
