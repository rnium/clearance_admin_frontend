import {configureStore} from '@reduxjs/toolkit'
import accountReducer from './accountReducer';
import studentStoreReducer from './studentStoreReducer';
import dashboardReducer from './dashboardReducer';
import membersReducer from './membersReducer';


const store = configureStore({
    reducer: {
        account: accountReducer,
        studentStore: studentStoreReducer,
        dashboard: dashboardReducer,
        members: membersReducer,
    }
})

export default store;

store.subscribe(() => console.log(store.getState()))