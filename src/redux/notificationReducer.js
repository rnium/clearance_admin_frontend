import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pendingStats: {
        clearances: 0,
        archived: 0,
        students: 0,
    },
    is_loaded: false,
    is_loading: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setPendingStats: (state, action) => {
            state.pendingStats = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
        setLoading: (state, action) => {
            state.is_loading = action.payload;
        }
    }
})

export const {
    setPendingStats, setLoaded
} = notificationSlice.actions;
export default notificationSlice.reducer;