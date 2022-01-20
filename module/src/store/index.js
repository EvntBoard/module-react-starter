import { configureStore } from "@reduxjs/toolkit";

import evntboardMiddleware from "./evntboard/middleware";
import evntboardReducer from "./evntboard";

const store = configureStore({
  reducer: {
    evntboard: evntboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(evntboardMiddleware),
});

export default store;
