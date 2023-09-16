import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  Chat,
  ChatMessage,
  ChatRoleType,
  ChatState,
  NEW_CHAT_DEFAULT,
} from "./types";
import { getStorage } from "@src/lib/storage";

export const saveChatFile = (chat: Chat) => {
  getStorage()
    .storeChat(chat)
    .catch((e: any) => console.error(e));
};
export const deleteChatFile = (id: string) => {
  getStorage()
    .deleteChat(id)
    .catch((e: any) => console.error(e));
};
const initialState: ChatState = {
  activeId: null,
  chats: {},
};

// Reducer
export const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    deleteChat: (state, payload: PayloadAction<{ id: string }>) => {
      delete state.chats[payload.payload.id];

      deleteChatFile(payload.payload.id);
    },
    clearChats: (state) => {
      Object.keys(state.chats).forEach(deleteChatFile);

      state.chats = {};
    },
    createChat: (state, payload: PayloadAction<{ preamble: string }>) => {
      const messageId = uuid();
      const id = uuid();
      state.chats[id] = {
        id,
        summary: NEW_CHAT_DEFAULT,
        draft: "",
        history: {
          [messageId]: {
            content: payload.payload.preamble,
            role: "system",
            id: messageId,
            isPreamble: true,
          },
        },
        botTyping: false,
        botTypingMessage: null,
      };

      state.activeId = id;

      saveChatFile(state.chats[id]);
    },
    editSummary: (
      state,
      payload: PayloadAction<{ id: string; summary: string }>
    ) => {
      const { id, summary } = payload.payload;
      state.chats[id].summary = summary;

      saveChatFile(state.chats[id]);
    },
    pushHistory: (
      state,
      payload: PayloadAction<{
        chatId: string;
        role: ChatRoleType;
        content: string;
      }>
    ) => {
      const { chatId, content, role } = payload.payload;
      const messageId = uuid();
      state.chats[chatId].history[messageId] = {
        id: messageId,
        role,
        content,
        isPreamble: false,
      };
      saveChatFile(state.chats[chatId]);
    },
    typeCompletionMessage: (
      state,
      payload: PayloadAction<{
        id: string;
        message: ChatMessage;
      }>
    ) => {
      const { id, message } = payload.payload;
      state.chats[id].botTypingMessage = message;
    },
    switchChat: (state, payload: PayloadAction<{ id: string | null }>) => {
      state.activeId = payload.payload.id;
    },
    updateDraft: (
      state,
      payload: PayloadAction<{ id: string; draft: string }>
    ) => {
      const { id, draft } = payload.payload;
      state.chats[id].draft = draft;
    },
    deleteMessage: (
      state,
      payload: PayloadAction<{ chatId: string; messageId: string }>
    ) => {
      const { chatId, messageId } = payload.payload;
      delete state.chats[chatId].history[messageId];
    },
    setImportant: (
      state,
      payload: PayloadAction<{
        chatId: string;
        messageId: string;
        important: boolean | undefined;
      }>
    ) => {
      const { chatId, messageId } = payload.payload;
      state.chats[chatId].history[messageId].isImportant =
        payload.payload.important;

      saveChatFile(state.chats[chatId]);
    },
    editMessage: (
      state,
      payload: PayloadAction<{
        chatId: string;
        messageId: string;
        content: string;
      }>
    ) => {
      const { chatId, messageId, content } = payload.payload;
      state.chats[chatId].history[messageId].content = content;

      saveChatFile(state.chats[chatId]);
    },
    abortCompletion: (state, payload: PayloadAction<{ id: string }>) => {
      const { id } = payload.payload;
      state.chats[id].botTyping = false;

      const resultContent = state.chats[id].botTypingMessage?.content;
      const resultRole = state.chats[id].botTypingMessage?.role;

      if (!resultContent || !resultRole) {
        return;
      }

      const messageId = uuid();

      state.chats[id].history[messageId] = {
        id: messageId,
        content: resultContent,
        role: resultRole,
        isPreamble: false,
      };

      state.chats[id].botTypingMessage = {
        content: undefined,
        role: undefined,
      };

      state.chats[id].botTypingMessage = null;

      saveChatFile(state.chats[id]);
    },
  },
});

// Actions
export const {
  createChat,
  clearChats,
  deleteChat,
  editSummary,
  pushHistory,
  switchChat,
  updateDraft,
  deleteMessage,
  editMessage,
  abortCompletion,
  setImportant,
} = chatsSlice.actions;
