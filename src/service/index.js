// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import user from 'src/service/apps/user'

export const service = configureStore({
    reducer: {
        user
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })

})