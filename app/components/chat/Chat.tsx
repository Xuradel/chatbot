'use client'
import React, { useState } from 'react';
import { BsChatRightDots } from 'react-icons/bs';
import ChatBox from './ChatBox';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <ChatBox setIsOpen={setIsOpen}/>
      ) : (
        <button 
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg focus:outline-none hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          <BsChatRightDots size={24} />
        </button>
      )}
    </div>
  );
}

export default Chat;
