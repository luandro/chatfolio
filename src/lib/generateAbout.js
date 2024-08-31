import axios from 'axios';
import * as cheerio from 'cheerio';

async function generateAbout() {
  try {
    const { data } = await axios.get(import.meta.env.VITE_ABOUT_URL);
    const $ = cheerio.load(data);

    // Supondo que o conteúdo desejado está dentro de um elemento com a classe 'about-content'
    const aboutContent = $(import.meta.env.VITE_SCRAPING_SELECTOR).map((i, el) => $(el).text().trim()).get().join(' ');
    console.log(aboutContent);
    return aboutContent;
  } catch (error) {
    console.error('Erro ao fazer o scraping do site:', error);
    return null;
  }
}

export default generateAbout;
