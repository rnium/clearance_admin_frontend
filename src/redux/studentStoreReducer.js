import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loaded: false,
    info: {
        state: 1
    },
    notice: {
        is_loaded: false,
        notice: null
    }
}

const studentSlice = createSlice({
    name: 'studentsection',
    initialState,
    reducers: {
        loadInfo: (state, action) => {
            state.info = action.payload;
        },
        loadNotice: (state, action) => {
            state.notice.notice = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
        setNoticeLoaded: (state, action) => {
            state.notice.is_loaded = action.payload;
        },
    }
});

export const {loadInfo, setLoaded, loadNotice, setNoticeLoaded} = studentSlice.actions;
export default studentSlice.reducer;