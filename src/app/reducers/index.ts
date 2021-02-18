import codeSlice from 'app/slices/codeSlice';


const rootReducer = {
    code: codeSlice
};

export type Reducer = typeof rootReducer;

export default rootReducer;