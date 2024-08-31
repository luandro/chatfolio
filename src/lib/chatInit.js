export const initializeChat = async (addBotMessage, t, setCurrentStep) => {
  addBotMessage(t('welcome'));
  setTimeout(() => {
    addBotMessage(t('available'));
    setTimeout(() => {
      addBotMessage(t('location'));
      setTimeout(() => {
        addBotMessage(t('currentProject'));
        setTimeout(() => {
          addBotMessage(t('collaboration'));
          setCurrentStep('userChoice');
        }, 1500);
      }, 1500);
    }, 1500);
  }, 1500);
};
