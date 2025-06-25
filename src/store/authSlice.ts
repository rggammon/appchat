import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  errors: string[];
}

const initialState: AuthState = {
  errors: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addError(state, action: PayloadAction<string>) {
      state.errors.push(action.payload);
    },
    clearErrors(state) {
      state.errors = [];
    },
    setErrors(state, action: PayloadAction<string[]>) {
      state.errors = action.payload;
    },
  },
});

export const { addError, clearErrors, setErrors } = authSlice.actions;
export default authSlice.reducer;
