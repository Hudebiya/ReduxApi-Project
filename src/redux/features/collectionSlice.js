import { createSlice } from '@reduxjs/toolkit'

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    items: JSON.parse(localStorage.getItem('collection')) || [],
  },
  reducers: {
    addToCollection(state, action) {
      const exists = state.items.find((i) => i.id === action.payload.id)
      if (!exists) state.items.push(action.payload)
    },
    removeFromCollection(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clearCollection(state) {
      state.items = []
    },
  },
})

export const { addToCollection, removeFromCollection, clearCollection } = collectionSlice.actions
export default collectionSlice.reducer