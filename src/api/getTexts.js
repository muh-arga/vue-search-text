import axios from 'axios';

const getTexts = (url, text, page) => {
  const baseUrl = "https://github.com/jefrydco/cari-teks-video-api";

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  return axios.get(baseUrl, {
    params: {
      url: url,
      q: text,
      page
    }
  });
};

export default getTexts;