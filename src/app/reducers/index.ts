import codeSlice from 'app/slices/codeSlice';


const rootReducer = {
    code: codeSlice
};

export type reducer = typeof rootReducer;

export default rootReducer;