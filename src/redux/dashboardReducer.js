import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deptSelected: 'CSE',
    pendingStudentDept: 'CSE',
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
    studentNotice: {
        isLoaded: false,
        notice: null,
    }
}

const dashboardSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setDeptSelected: (state, action) => {
            state.deptSelected = action.payload;
        },
        setStudentNotice: (state, action) => {
            state.studentNotice.notice = action.payload;
        },
        setStudentNoticeLoaded: (state, action) => {
            state.studentNotice.isLoaded = action.payload;
        },
        setPendingStudentDept: (state, action) => {
            state.pendingStudentDept = action.payload;
        },
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
    setPendingClearances, setDeptSelected, setPendingStudentDept, 
    setPendingClearancesLoaded, setAdminRoles, setAdminRolesLoaded, 
    setPendingAccounts, setPendingAccountsLoaded, setStudentNotice, setStudentNoticeLoaded
} = dashboardSlice.actions;
export default dashboardSlice.reducer;