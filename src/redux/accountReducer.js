import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userinfo: {
        is_authenticated: true,
        username: '',
        avatar_url: '',
        user_fullname: '',
        account_type: 'student',
        user_type: '',
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