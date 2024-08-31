import emailjs from 'emailjs-com';

export const sendEmail = (userEmail, userInput, t, addBotMessage, setMessages, setUserInput, setShowInput, setCurrentStep, setFormattedEmail) => {
  setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: userInput }]);
  
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_email: userEmail,
      message: userInput
    },
    import.meta.env.VITE_EMAILJS_USER_ID
  )
  .then((response) => {
    console.log('Email sent successfully:', response);
    addBotMessage(t('messageSent'));
  })
  .catch((error) => {
    console.error('Error sending email:', error);
    addBotMessage(t('messageError'));
  });

  setUserInput('');
  setShowInput(false);
  setCurrentStep('userChoice');
  setFormattedEmail('');
};
