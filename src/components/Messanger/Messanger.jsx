import React, { useState } from 'react';

import { createTimestamp } from '../../utils/timestamp';

const Messanger = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const sendMessage = () => {
    if (value.trim() === '') return;

    const message = {
      content: value.trim(),
      timestamp: createTimestamp(),
    };

    onSubmit(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      setValue('');
    }
  };

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        className="form-control"
        placeholder="Type your message here"
        name=""
        id=""
        rows="3"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Messanger;
