import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReduser";
import {thunk} from "redux-thunk";

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (err) {
      // Handle errors
    }
  };

  const preloadedState = loadState();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  });

  store.subscribe(() => {
    saveState(store.getState());
  });

export default store;