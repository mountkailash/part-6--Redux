import React, { createContext, useReducer, useContext } from "react";

// 1. create a context for managing notification state
const NotificationContext = createContext()

// 2. custom hook to consume the notification context
export const useNotification = () => useContext(NotificationContext)

// 3. define initial state for notification
const initialState = {
    message: '',
}

// 4. define reducer function to handle notification state changes
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {message: action.payload}
        case 'HIDE_NOTIFICATION':
            return {message: ''}
        default:
            return state
    }
}

// 5. define a provider component to wrap the application and provide access to notification state
export const NotificationProvider = ({ children }) => {

    // 6. use useReducer hook to manage notification state
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    // 7. provide notification state and dispatch function to children components through context
    return(
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}