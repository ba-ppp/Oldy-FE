import { combineReducers } from '@reduxjs/toolkit';
import codeSlice from 'app/slices/codeSlice';
import userProfileSlice from 'app/slices/userProfileSlice';

const rootReducer = combineReducers({
    code: codeSlice,
    profile: userProfileSlice,
});

export default rootReducer;
