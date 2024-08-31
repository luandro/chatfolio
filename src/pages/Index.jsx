import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatMessage = ({ message, sender }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`mb-4 ${sender === 'user' ? 'text-right' : 'text-left'}`}
  >
    <div
      className={`inline-block p-3 rounded-lg ${
        sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
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
    className="flex space-x-2 mb-4"
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

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('/src/data/portfolio-messages.md');
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">John Doe - Software Developer</h1>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.message} sender={msg.sender} />
            ))}
            {isTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        {conversationEnded && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Index;
