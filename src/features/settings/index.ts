import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingsState } from "./types";

const initialState: SettingsState = {
  preamble:
    "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.",
  maxTokens: 5,
  shiftSend: false,
  showPreamble: false,
  model: null,
};

// Reducer
export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPreamble: (state, payload: PayloadAction<{ preamble: string }>) => {
      state.preamble = payload.payload.preamble;
    },
    setModel: (state, payload: PayloadAction<{ model: string }>) => {
      state.model = payload.payload.model;
    },
    setShiftKey: (state, payload: PayloadAction<{ shiftSend: boolean }>) => {
      state.shiftSend = payload.payload.shiftSend;
    },
    setShowPreamble: (state, payload: PayloadAction<{ show: boolean }>) => {
      state.showPreamble = payload.payload.show;
    },
  },
});
// Actions
export const { setPreamble, setModel, setShiftKey, setShowPreamble } =
  settingSlice.actions;

export const dialogueReducer = settingSlice.reducer;

export const INITIAL_SETTINGS_STATE = initialState;
