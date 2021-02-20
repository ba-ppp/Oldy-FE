import codeSlice from 'app/slices/codeSlice';
import userProfileSlice from 'app/slices/userProfileSlice';

const rootReducer = {
    code: codeSlice,
    profile: userProfileSlice,
};

export type Reducer = typeof rootReducer;

export default rootReducer;
