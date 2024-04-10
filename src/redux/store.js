import {configureStore} from '@reduxjs/toolkit'
import accountReducer from './accountReducer';
import studentStoreReducer from './studentStoreReducer';
import dashboardReducer from './dashboardReducer';


const store = configureStore({
    reducer: {
        account: accountReducer,
        studentStore: studentStoreReducer,
        dashboard: dashboardReducer,
    }
})

export default store;

store.subscribe(() => console.log(store.getState()))