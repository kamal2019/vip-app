import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slice/themeSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

export default store
