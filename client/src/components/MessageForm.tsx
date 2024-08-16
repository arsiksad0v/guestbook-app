import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMessage } from '../features/messagesSlice';
import { AppDispatch } from '../app/store';

const MessageForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('author', author);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createMessage(formData));
    setAuthor('');
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Content (required):
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </label>
      </div>
      <button type="submit">Add Message</button>
    </form>
  );
};

export default MessageForm;