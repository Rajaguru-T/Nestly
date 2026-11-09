import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: { hotels: hotelReducer, auth: authReducer },
});


store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("hotels_v2", JSON.stringify(state.hotels.items));
    localStorage.setItem("favorites", JSON.stringify(state.hotels.favorites));
    localStorage.setItem("role", state.auth.role);
  } catch (e) {
    console.log("localStorage full, could not save");
  }
});

export default store;
