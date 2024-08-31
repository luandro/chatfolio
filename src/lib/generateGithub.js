import axios from 'axios';

async function generateGithub() {
  try {
    // Fetch user data
    const username = import.meta.env.VITE_GITHUB_USERNAME || 'luandro';
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const userData = userResponse.data;

    // Fetch repositories data
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
    const reposData = reposResponse.data;

    // Format the message
    let message = `### About ${userData.name}\n\n`;
    message += `${userData.bio}\n\n`;
    message += `#### Latest Repositories:\n`;

    reposData.forEach(repo => {
      message += `- [${repo.name}](${repo.html_url}): ${repo.description}\n`;
    });

    return message;
  } catch (error) {
    console.error('Error fetching data from GitHub:', error);
    return 'An error occurred while fetching data from GitHub.';
  }
}

export default generateGithub;
