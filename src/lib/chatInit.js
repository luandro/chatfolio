export const initializeChat = (addBotMessage, t, setCurrentStep) => {
  addBotMessage(t('welcomeMessage'));
  setCurrentStep('userChoice');
};
