import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../features/messagesSlice';
import { RootState, AppDispatch } from '../app/store';

const MessageList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.messages);
  const status = useSelector((state: RootState) => state.messages.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getMessages());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Guestbook Messages</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p><strong>{message.author}</strong> ({new Date(message.timestamp).toLocaleString()}):</p>
              <p>{message.content}</p>
              {message.imageUrl && <img src={message.imageUrl} alt="Message Attachment" />}
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Failed to load messages.</p>}
    </div>
  );
};

export default MessageList;