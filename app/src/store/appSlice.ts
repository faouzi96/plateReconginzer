import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  quickFilter: string;
  nearToMe: boolean;
  priceFilter: number;
  availability: boolean;
}

const initialState: CounterState = {
  quickFilter: "",
  nearToMe: false,
  priceFilter: 0,
  availability: false,
}

export const appSlice = createSlice({
  name: 'App Slice',
  initialState,
  reducers: {
    setQuickFilter: (state, action) => {
      return {...state, quickFilter: action.payload}
    },
    setNearToMe: (state, action) => {
      return {...state, nearToMe: action.payload}
    },
    setPriceFilter: (state, action) => {
      return {...state, priceFilter: action.payload}
    },
    setAvailability: (state, action) => {
      return {...state, availability: action.payload}
    },
  },
})

export const { setQuickFilter, setNearToMe, setPriceFilter, setAvailability } = appSlice.actions

export default appSlice.reducer