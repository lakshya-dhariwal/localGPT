import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { chatsSlice } from ".";
import { getApiConfiguration } from "../settings/selectors";
import { createToast } from "../toasts/thunks";
import { selectChat } from "./selectors";

export const streamCompletion = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("chat/streamCompletion", async (id: string, thunkAPI) => {
  const state = thunkAPI.getState();

  if (!state.settings.model) {
    thunkAPI.dispatch(
      createToast({
        message: "Please download a model and set it's file location",
        type: "error",
        duration: 3000,
      })
    );
    throw new Error("Model not found");
  }

  const chat = selectChat(id)(state);

  if (!chat) {
    throw new Error("Chat not found");
  }

  console.log({ history: chat.history });
});
