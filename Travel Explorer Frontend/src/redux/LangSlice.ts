import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;