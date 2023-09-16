import axios from 'axios';

const PAGE_URL = 'https://pixabay.com/api/';
const API_KEY = '25385009-fbf12157e432b3e643b87146c';

export const fetchImagesIPA = async (inputValue, page, loader) => {
  try {
    const response = await axios.get(PAGE_URL, {
      params: {
        key: API_KEY,
        q: inputValue,
        imageType: 'photo',
        orientation: 'horizontal',
        page: page,
      },
    });

    if (response.status === 200 && response.data && response.data.hits) {
      return response.data;
    } else {
      throw new Error('Invalid response from the API');
    }
  } catch (error) {
    console.error('Error:', error);
    loader();
  }
};
