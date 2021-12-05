import axios from 'axios';

const textList = (url, text, page) => {
  const baseUrl = "https://cari-teks-video-api.vercel.app/api/search";

  return axios.get(baseUrl, {
    params: {
      url: url,
      q: text,
      page
    }
  });
};

export default textList;