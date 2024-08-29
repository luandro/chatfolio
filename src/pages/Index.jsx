import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const Index = () => {
  const [messages, setMessages] = useState([]);
  const conversation = [
    { sender: 'bot', message: "Hello! I'm John Doe, a software developer." },
    { sender: 'user', message: "Nice to meet you, John! What's your expertise?" },
    { sender: 'bot', message: "I specialize in React, Node.js, and cloud technologies." },
    { sender: 'user', message: "That's impressive! Can you tell me about a recent project?" },
    { sender: 'bot', message: "Sure! I recently built a scalable e-commerce platform using React for the frontend and Node.js with GraphQL for the backend. It handles thousands of concurrent users and integrates with various payment gateways." },
    { sender: 'user', message: "Wow, that sounds complex. How do you handle challenges in your projects?" },
    { sender: 'bot', message: "I approach challenges methodically. I break down problems, research solutions, and collaborate with team members when needed. Continuous learning is key in our field." },
    { sender: 'user', message: "Great approach! What's your favorite part about being a developer?" },
    { sender: 'bot', message: "I love the constant evolution of technology and the opportunity to create solutions that make a real impact. There's always something new to learn!" },
  ];

  useEffect(() => {
    const addMessage = (index) => {
      if (index < conversation.length) {
        setMessages((prevMessages) => [...prevMessages, conversation[index]]);
        setTimeout(() => addMessage(index + 1), 2000);
      }
    };

    addMessage(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">John Doe - Software Developer</h1>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} sender={msg.sender} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
