import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteSlice'
import filterReducer from '../reducers/filterSlice'
import notificationReducer from '../reducers/notificationSlice'



export default configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})