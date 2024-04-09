import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loaded: false,
    info: {
        state: 1
    }
}

const studentSlice = createSlice({
    name: 'studentsection',
    initialState,
    reducers: {
        loadInfo: (state, action) => {
            state.info = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
    }
});

export const {loadInfo, setLoaded} = studentSlice.actions;
export default studentSlice.reducer;