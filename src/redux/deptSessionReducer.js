import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    departments: null,
    is_loaded: false,
}

const sessionsSlice = createSlice({
    name: 'dept_sessions',
    initialState,
    reducers: {
        setDeptSessions: (state, action) => {
            state.departments = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
    }
})

export const {
    setDeptSessions, setLoaded
} = sessionsSlice.actions;
export default sessionsSlice.reducer;