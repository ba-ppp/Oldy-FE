import codeSlice from 'app/slices/codeSlice';
import userProfileSlice from 'app/slices/userProfileSlice';

const rootReducer = {
    code: codeSlice,
    profile: userProfileSlice,
};

export default rootReducer;
