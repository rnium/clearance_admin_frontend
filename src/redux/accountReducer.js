import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userinfo: {
        is_authenticated: true,
        username: 'rnium@aol.com',
        avatar_url: '/media/profiles/dp/_4735f372-f72d-416c-85cd-6bab3c795456_SnBimOx.jpg',
        user_fullname: 'Md Saiful Islam',
        account_type: 'admin',
        user_type: 'academic',
        is_superadmin: false,
    },
    is_loaded: true,
    is_loading: false,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userinfo = action.payload;
        },
        setLoaded: (state, action) => {
            state.is_loaded = action.payload;
        },
        setLoading: (state, action) => {
            state.is_loading = action.payload;
        },
        resetUserInfo: (state, action) => {
            state.userinfo = initialState.userinfo
        }
    }
})

export const {
    setUserInfo, setLoaded, setLoading, resetUserInfo
} = accountSlice.actions;
export default accountSlice.reducer;