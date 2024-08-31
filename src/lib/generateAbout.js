import axios from 'axios';
import * as cheerio from 'cheerio';

async function generateAbout() {
  try {
    const aboutUrl = import.meta.env.VITE_ABOUT_URL || 'https://example.com';
    const scrapingSelector = import.meta.env.VITE_SCRAPING_SELECTOR || 'body > div:first-of-type p';

    const { data } = await axios.get(aboutUrl);
    const $ = cheerio.load(data);

    const aboutContent = $(scrapingSelector).map((i, el) => $(el).text().trim()).get().join(' ');
    console.log(aboutContent);
    return aboutContent;
  } catch (error) {
    console.error('Erro ao fazer o scraping do site:', error);
    return null;
  }
}

export default generateAbout;
