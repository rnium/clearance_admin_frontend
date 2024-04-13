import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    memberSections: [],
    is_loaded: false,
}

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setMembers: (state, action) => {
            state.memberSections = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
    }
})

export const {
    setMembers, setLoaded
} = membersSlice.actions;
export default membersSlice.reducer;