import { createSlice } from "@reduxjs/toolkit"; 


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        timeoutId: null
    },

    reducers: {
        setNotification(state, action)  {
            state.message = action.payload.message
            
            // Set new timeout for clearing notification
            state.timeoutId = setTimeout(() => {
                state.message = ''
            }, action.payload.timeout * 1000)
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer