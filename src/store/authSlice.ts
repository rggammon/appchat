import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  errors: string[];
  customScopeErrors: string[];
}

const initialState: AuthState = {
  errors: [],
  customScopeErrors: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addError(state, action: PayloadAction<string>) {
      state.errors.push(action.payload);
    },
    addCustomScopeError(state, action: PayloadAction<string>) {
      state.customScopeErrors.push(action.payload);
    },
    clearErrors(state) {
      state.errors = [];
    },
    clearCustomScopeErrors(state) {
      state.customScopeErrors = [];
    },
    setErrors(state, action: PayloadAction<string[]>) {
      state.errors = action.payload;
    },
    setCustomScopeErrors(state, action: PayloadAction<string[]>) {
      state.customScopeErrors = action.payload;
    },
  },
});

export const {
  addError,
  clearErrors,
  setErrors,
  addCustomScopeError,
  clearCustomScopeErrors,
  setCustomScopeErrors,
} = authSlice.actions;
export default authSlice.reducer;
