import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setNotificationWithoutTimeout(state, action) {
      state.message = action.payload
    },
    clearNotification(state, action) {
      state.message = ''
    },
    setTimeoutID(state, action) {
      state.timeoutID = action.payload
    }
  }
})

export const { setNotificationWithoutTimeout, clearNotification, setTimeoutID } = notificationSlice.actions

export const setNotification = ( message, delayInSeconds ) => {
  return (dispatch, getState) => {
    clearTimeout(getState().notification.timeoutID)
    dispatch(setNotificationWithoutTimeout(message))
    const newTimeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, delayInSeconds * 1000)
    dispatch(setTimeoutID(newTimeoutID))
  }
}

export default notificationSlice.reducer