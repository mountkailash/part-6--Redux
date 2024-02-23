 
import { setNotification } from "../reducers/notificationSlice" 

export const displayNotification = (dispatch, message, duration) => {
    // Show the notification
    dispatch(setNotification({ message, timeout: duration }));
    
}