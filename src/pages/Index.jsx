import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Briefcase, User, Mail, CheckCircle, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { marked } from "marked";
import { initializeChat } from '../lib/chatInit';
import handleUserChoice from '../lib/userChoice';
import { sendEmail } from '../lib/email';

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
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [formattedEmail, setFormattedEmail] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [currentStep, setCurrentStep] = useState('language');
  const [inputType, setInputType] = useState('email');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [languageTimer, setLanguageTimer] = useState(null);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const addBotMessage = (message, delay = 1000, format = 'text') => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (['md', 'markdown'].includes(format.toLowerCase())) {
        setMessages((prevMessages) => [
          ...prevMessages, 
          { sender: 'bot', message: marked.parse(message), format }
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages, 
          { sender: 'bot', message, format }
        ]);
      }
    }, delay);
  };

  const handleLanguageChoice = (lang) => {
    if (languageTimer) {
      clearTimeout(languageTimer);
    }
    i18n.changeLanguage(lang);
    setCurrentStep('welcome');
    setShowInput(false);
    initializeChat(addBotMessage, t, setCurrentStep);
  };

  useEffect(() => {
    const detectedLang = i18n.language;
    const prunedLang = detectedLang.split('-')[0];
    addBotMessage(t('languagePrompt', { language: t(`languages.${prunedLang}`) }));
    
    const timer = setTimeout(() => {
      handleLanguageChoice(detectedLang);
    }, 5500);

    setLanguageTimer(timer);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputType === 'email') {
      if (validateEmail(userInput)) {
        setUserEmail(userInput);
        const formatted = userInput.replace(/(.{2})(.+)(@.+)/, (_, start, middle, end) => 
          start + middle.replace(/./g, '*') + end
        );
        setFormattedEmail(formatted);
        setUserInput('');
        setInputType('message');
        addBotMessage(t('emailConfirmation', { email: formatted }));
      } else {
        addBotMessage(t('invalidEmail'));
      }
    } else if (inputType === 'message') {
      if (userInput.trim()) {
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: userInput }]);
        
        try {
          sendEmail(userEmail, userInput, t, addBotMessage, setMessages, setUserInput, setShowInput, setCurrentStep, setFormattedEmail);
        } catch (error) {
          console.error('Error sending email:', error);
          addBotMessage(t('messageError'));
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">{t('name')} - {t('workPosition')}</h1>
        <div className="flex space-x-2">
          {['en', 'pt', 'es'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChoice(lang)}
              className={`px-2 py-1 rounded ${i18n.language === lang ? 'bg-white text-green-600' : 'bg-green-700'}`}
            >
              {t(`languages.${lang}`)}
            </button>
          ))}
        </div>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            msg.format === 'markdown' ? (
              <div key={index} className="rendered-md" dangerouslySetInnerHTML={{ __html: msg.message }} />
            ) : (
              <ChatMessage key={index} message={msg.message} sender={msg.sender} />
            )
          ))}
          {isTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      {currentStep === 'language' && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex justify-center space-x-4">
            <Button onClick={() => handleLanguageChoice(i18n.language)} icon={Globe}>{t('yes')}</Button>
            <Button onClick={() => {
              if (languageTimer) {
                clearTimeout(languageTimer);
              }
              setCurrentStep('languageChoice');
            }} icon={Globe}>{t('chooseLanguage')}</Button>
          </div>
        </div>
      )}
      {currentStep === 'languageChoice' && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex justify-center space-x-4">
            {['en', 'pt', 'es'].map((lang) => (
              <Button key={lang} onClick={() => handleLanguageChoice(lang)} icon={Globe}>
                {t(`languages.${lang}`)}
              </Button>
            ))}
          </div>
        </div>
      )}
      {currentStep === 'userChoice' && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:space-x-4">
            <Button onClick={() => handleUserChoice(t('latestWork'), t, setMessages, addBotMessage, setShowInput, setInputType)} icon={Github}>{t('latestWork')}</Button>
            <Button onClick={() => handleUserChoice(t('currentProjectDetails'), t, setMessages, addBotMessage, setShowInput, setInputType)} icon={Briefcase}>{t('currentProjectDetails')}</Button>
            <Button onClick={() => handleUserChoice(t('aboutMe'), t, setMessages, addBotMessage, setShowInput, setInputType)} icon={User}>{t('aboutMe')}</Button>
            <Button onClick={() => handleUserChoice(t('contact'), t, setMessages, addBotMessage, setShowInput, setInputType)} icon={Mail}>{t('contact')}</Button>
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
            <div className="flex flex-col space-y-2">
              {formattedEmail && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-600"
                >
                  <CheckCircle size={16} />
                  <span className="text-sm">{t('emailLabel')}: {formattedEmail}</span>
                </motion.div>
              )}
              <div className="flex space-x-2">
                <motion.div className="flex-grow" variants={inputElementVariants}>
                  <input
                    type={inputType === 'email' ? 'email' : 'text'}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={inputType === 'email' ? t('enterEmail') : t('typeMessage')}
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
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Index;
