import generateGithub from './generateGithub';
import generateAbout from './generateAbout';

export default async (choice, t, setMessages, addBotMessage, setShowInput, setInputType) => {
  setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: choice }]);
  
  switch (choice) {
    case t('latestWork'):
      // Fetch and display GitHub projects
      const githubResponse = await generateGithub();
      if (githubResponse) {
        addBotMessage(githubResponse, null, 'markdown');
      } else {
        addBotMessage(t('githubError'));
      }
      break;
    case t('currentProjectDetails'):
      addBotMessage(t('currentProjectDetailsResponse'));
      break;
    case t('aboutMe'):
      const aboutMeResponse = await generateAbout();
      if (aboutMeResponse) {
        addBotMessage(aboutMeResponse);
      } else {
        addBotMessage(t('aboutMeError'));
      }
      break;
    case t('contact'):
      setShowInput(true);
      setInputType('email');
      addBotMessage(t('emailPrompt'));
      break;
    default:
      addBotMessage(t('defaultResponse'));
  }
};