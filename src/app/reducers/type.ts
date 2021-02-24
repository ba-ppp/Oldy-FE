import { createSelectorHook } from 'react-redux';
import { CodeReducer } from 'app/slices/codeSlice';
import { UserProfileReducer } from 'app/slices/userProfileSlice';

type RootState = {
    code: CodeReducer;
    profile: UserProfileReducer;
};

export const useSelector = createSelectorHook<RootState>();
