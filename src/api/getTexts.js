import axios from 'axios';

const getTexts = (url, text, page) => {
  const baseUrl = process.env.VUE_APP_API_BASE_URL;

  return axios.get(baseUrl, {
    params: {
      url: url,
      q: text,
      page
    }
  });
};

export default getTexts;