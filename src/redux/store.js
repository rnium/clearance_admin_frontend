import {configureStore} from '@reduxjs/toolkit'
import accountReducer from './accountReducer';
import studentStoreReducer from './studentStoreReducer';
import dashboardReducer from './dashboardReducer';
import membersReducer from './membersReducer';
import departmentsReducer from './departmentsReducer';
import deptSessionReducer from './deptSessionReducer';
import notificationReducer from './notificationReducer';


const store = configureStore({
    reducer: {
        account: accountReducer,
        studentStore: studentStoreReducer,
        dashboard: dashboardReducer,
        members: membersReducer,
        departments: departmentsReducer,
        deptSession: deptSessionReducer,
        notification: notificationReducer,
    }
})

export default store;

// store.subscribe(() => console.log(store.getState()))