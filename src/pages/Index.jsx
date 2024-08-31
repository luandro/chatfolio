import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, sender }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`mb-4 ${sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
  >
    <div
      className={`max-w-[70%] p-3 rounded-lg ${
        sender === 'user' ? 'bg-green-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
      }`}
    >
      {message}
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex space-x-2 mb-4 p-3 bg-gray-100 rounded-lg max-w-[70px]"
  >
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
  </motion.div>
);

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/portfolio-messages.md');
        const text = await response.text();
        const lines = text.split('\n').filter(line => line.startsWith('- '));
        const portfolioMessages = lines.map(line => line.slice(2));

        const addMessage = (index) => {
          if (index < portfolioMessages.length) {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: portfolioMessages[index] }]);
              setTimeout(() => addMessage(index + 1), 1000);
            }, 1500);
          } else {
            setConversationEnded(true);
          }
        };

        addMessage(0);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([{ sender: 'bot', message: 'Sorry, there was an error loading the portfolio messages.' }]);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: userInput }]);
      setUserInput('');
      // Simulate bot response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: "Thank you for your message! As an AI, I'm here to assist you with any questions about my experience or skills as a software developer." }]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">John Doe - Software Developer</h1>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} sender={msg.sender} />
          ))}
          {isTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
