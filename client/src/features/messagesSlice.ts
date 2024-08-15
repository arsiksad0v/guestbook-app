import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, addMessage } from '../api/messagesApi';

interface Message {
  id: string;
  author: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
}

interface MessagesState {
  messages: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  status: 'idle',
  error: null,
};

export const getMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const messages = await fetchMessages();
  return messages;
});

export const createMessage = createAsyncThunk('messages/addMessage', async (message: FormData) => {
  const newMessage = await addMessage(message);
  return newMessage;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;