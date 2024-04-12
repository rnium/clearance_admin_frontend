import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pendingClearances: {
        isLoaded: false,
        clearances: null
    },
    adminRoles: {
        isLoaded: false,
        roles: []
    },
    pendingAccounts: {
        isLoaded: false,
        accounts: null
    },
}

const dashboardSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setPendingClearances: (state, action) => {
            state.pendingClearances.clearances = action.payload;
        },
        setPendingClearancesLoaded: (state, action) => {
            state.pendingClearances.isLoaded = action.payload;
        },
        setAdminRoles: (state, action) => {
            state.adminRoles.roles = action.payload;
        },
        setAdminRolesLoaded: (state, action) => {
            state.adminRoles.isLoaded = action.payload;
        },
        setPendingAccounts: (state, action) => {
            state.pendingAccounts.accounts = action.payload;
        },
        setPendingAccountsLoaded: (state, action) => {
            state.pendingAccounts.isLoaded = action.payload;
        },
    }
})

export const {
    setPendingClearances, setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded, setPendingAccounts, setPendingAccountsLoaded
} = dashboardSlice.actions;
export default dashboardSlice.reducer;