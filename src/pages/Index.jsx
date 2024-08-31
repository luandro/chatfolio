import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Briefcase, User, Mail } from 'lucide-react';
import emailjs from 'emailjs-com';

const inputContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    }
  }
};

const inputElementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    }
  }
};

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

const Button = ({ onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200 w-full md:w-auto md:flex-row"
  >
    {Icon && <Icon className="mb-1 md:mb-0 md:mr-2" size={24} />}
    <span className="text-sm md:text-base">{children}</span>
  </button>
);

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [inputType, setInputType] = useState('email');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const addBotMessage = (message, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message }]);
    }, delay);
  };

  const handleUserChoice = async (choice) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: choice }]);
    
    switch (choice) {
      case 'Latest Work':
        addBotMessage("Here are my latest GitHub projects:");
        // Fetch and display GitHub projects
        break;
      case 'Current Project Details':
        addBotMessage("I'm currently working on a React-based portfolio website with a chatbot interface.");
        break;
      case 'About Me':
        addBotMessage("I'm a software developer with 5 years of experience, specializing in React and Node.js.");
        break;
      case 'Contact':
        setShowInput(true);
        setInputType('email');
        addBotMessage("Great! Please enter your email address.");
        break;
      default:
        addBotMessage("I'm not sure how to respond to that. Can you please choose one of the options?");
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      addBotMessage("Welcome! I'm John Doe, a software developer.");
      setTimeout(() => {
        addBotMessage("I'm currently available for new projects.");
        setTimeout(() => {
          addBotMessage("Location: San Francisco, CA");
          setTimeout(() => {
            addBotMessage("Main current project: Building a React-based portfolio website");
            setTimeout(() => {
              addBotMessage("Current collaboration: Working with a team on an open-source project");
              setCurrentStep('userChoice');
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1500);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputType === 'email') {
      if (validateEmail(userInput)) {
        setUserEmail(userInput);
        setUserInput('');
        setInputType('message');
        addBotMessage("Thank you. Now, please type your message.");
      } else {
        addBotMessage("Please enter a valid email address.");
      }
    } else if (inputType === 'message') {
      if (userInput.trim()) {
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: userInput }]);
        
        // Send email using EmailJS
        emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          {
            from_email: userEmail,
            message: userInput
          },
          'YOUR_USER_ID'
        )
        .then((response) => {
          console.log('Email sent successfully:', response);
          addBotMessage("Thank you for your message! I'll get back to you soon.");
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          addBotMessage("There was an error sending your message. Please try again later.");
        });

        setUserInput('');
        setShowInput(false);
        setCurrentStep('userChoice');
      }
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
      {currentStep === 'userChoice' && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:space-x-4">
            <Button onClick={() => handleUserChoice('Latest Work')} icon={Github}>Latest Work</Button>
            <Button onClick={() => handleUserChoice('Current Project Details')} icon={Briefcase}>Current Project</Button>
            <Button onClick={() => handleUserChoice('About Me')} icon={User}>About Me</Button>
            <Button onClick={() => handleUserChoice('Contact')} icon={Mail}>Contact</Button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showInput && (
          <motion.form
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={inputContainerVariants}
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex space-x-2">
              <motion.div className="flex-grow" variants={inputElementVariants}>
                <input
                  type={inputType === 'email' ? 'email' : 'text'}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={inputType === 'email' ? "Enter your email" : "Type your message"}
                  className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </motion.div>
              <motion.button
                variants={inputElementVariants}
                type="submit"
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Send size={24} />
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
