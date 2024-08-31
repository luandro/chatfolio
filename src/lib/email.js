import emailjs from 'emailjs-com';

export const sendEmail = (userEmail, userMessage, t, addBotMessage, setMessages, setUserInput, setShowInput, setCurrentStep, setFormattedEmail) => {
  const templateParams = {
    email: userEmail,
    message: userMessage,
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
    .then((response) => {
      addBotMessage(t('emailSent'));
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: t('emailSent') }]);
      setUserInput('');
      setShowInput(false);
      setCurrentStep('language');
      setFormattedEmail('');
    })
    .catch((error) => {
      addBotMessage(t('emailError'));
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: t('emailError') }]);
    });
};
