import axios from 'axios';

const API_URL = 'http://localhost:3000/api/messages';

export const fetchMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMessage = async (message: FormData) => {
  const response = await axios.post(API_URL, message, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};