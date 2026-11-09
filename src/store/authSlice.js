import { createSlice } from "@reduxjs/toolkit";


function loadRole() {
  const saved = localStorage.getItem("role");
  return saved === "admin" ? "admin" : "user";
}

const authSlice = createSlice({
  name: "auth",
  initialState: { role: loadRole() },
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
