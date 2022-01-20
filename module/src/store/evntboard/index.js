import {createAction, createSlice} from '@reduxjs/toolkit'

export * as selectors from './selector'

const PATH = "EVNTBOARD";

const wsCreateEvent = createAction(`${PATH}/NEW_EVENT`)

const slice = createSlice({
  name: PATH,
  initialState: {
    events: [],
    ws: {
      id: null,
      loading: false,
      error: {}
    }
  },
  reducers: {
    wsConnect: (state) => {
      state.ws.id = null
      state.ws.loading = true
      state.ws.error = {}
    },
    wsDisconnect: (state) => {
      state.ws.id = null
      state.ws.loading = false
      state.ws.error = {}
    },
    wsOnOpen: (state, action) => {
      state.ws.id = action.payload
      state.ws.loading = false
      state.ws.error = {}
    },
    wsOnClose: (state) => {
      state.ws.id = null
      state.ws.loading = false
      state.ws.error = {}
    },
    wsOnError: (state, action) => {
      state.ws.id = null
      state.ws.loading = false
      state.ws.error = action.payload
    },
    wsNewEvent: (state, action) => {
      state.events.push(action.payload)
    },
  }
});

export const actions = {
  ...slice.actions,
  wsCreateEvent
}
export default slice.reducer;
