import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userinfo: {
        is_authenticated: false,
        username: 'rony',
        user_fullname: 'Md. Saiful Islam',
        account_type: 'principal',
        user_type: 'admin',
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
export default accountSlice.reducer