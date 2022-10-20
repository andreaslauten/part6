import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationWithoutTimeout(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { setNotificationWithoutTimeout, clearNotification } = notificationSlice.actions

export const setNotification = ( message, delayInSeconds ) => {
  return (dispatch) => {
    console.log(message)
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, delayInSeconds * 1000)
  }
}

export default notificationSlice.reducer