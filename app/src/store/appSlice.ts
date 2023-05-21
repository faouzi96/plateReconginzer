import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  quickFilter: string;
  nearToMe: boolean;
  priceFilter: number;
  availability: boolean;
  parkingsData: any;
}

const initialState: CounterState = {
  quickFilter: "",
  nearToMe: false,
  priceFilter: 0,
  availability: false,
  parkingsData: null
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
    setParkingsData: (state, action) => {
      return {...state, parkingsData: action.payload}
    },
  },
})

export const { setQuickFilter, setNearToMe, setPriceFilter, setAvailability, setParkingsData } = appSlice.actions

export default appSlice.reducer