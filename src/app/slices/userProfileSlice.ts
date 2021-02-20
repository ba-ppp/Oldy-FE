import { createSlice } from '@reduxjs/toolkit';

export type UserProfileReducer = {
    email: string;
    name: string;
    username: string;
};

const userProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        email: '',
        name: '',
        username: '',
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
});

export const { addProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
