import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: '' },
  reducers: {
    setGlobalTheme: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const { setGlobalTheme } = themeSlice.actions
export default themeSlice.reducer
