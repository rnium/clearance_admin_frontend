import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deptSections: [],
    is_loaded: false,
}

const deptsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        setDeptSections: (state, action) => {
            state.deptSections = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
    }
})

export const {
    setDeptSections, setLoaded
} = deptsSlice.actions;
export default deptsSlice.reducer;