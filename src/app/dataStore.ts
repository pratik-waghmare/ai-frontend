import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DataStoreState {
  input: string
}

const initialState: DataStoreState = {
    input: ''
}

export const counterSlice = createSlice({
  name: 'dataStore',
  initialState,
  reducers: {
    updateInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateInput } = counterSlice.actions

export default counterSlice.reducer