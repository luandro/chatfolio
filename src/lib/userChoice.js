export const handleUserChoice = (choice, t, setMessages, addBotMessage, setShowInput, setInputType) => {
  setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: choice }]);
  addBotMessage(t('processingChoice'));
  setShowInput(true);
  setInputType('message');
};
