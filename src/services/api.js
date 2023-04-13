import axios from 'axios';

const KEY = '33152834-eeaeeae4e604e04dc4cc38ec8';
const BASE_URL = 'https://pixabay.com/api/';
const PARAMS = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async function (query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}${PARAMS}`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};
