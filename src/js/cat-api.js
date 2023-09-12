import axios from 'axios';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_RKbeG352oEL0N2icd3CFQ3bfAOlf6sEwaxX9zfp5LlVuPlR9gp1XK6EPICqMVy8C';
axios.defaults.baseURL = `https://api.thecatapi.com/`;

export async function fetchBreeds() {
  try {
    refs.selectEL.classList.add('breed_select__none');

    const { data } = await axios(`v1/breeds`);

    refs.selectEL.classList.remove('breed_select__none');
    refs.loader.classList.add('loader_active');
    return data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');

    refs.loader.classList.add('loader_active');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    refs.loader.classList.remove('loader_active');
    const {
      data: {
        0: {
          breeds: {
            0: { name, temperament, description },
          },
          url,
        },
      },
    } = await axios(`v1/images/search?breed_ids=${breedId}`);
    refs.loader.classList.add('loader_active');
    return {
      url: url,
      temperament: temperament,
      description: description,
      name: name,
    };
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    refs.loader.classList.add('loader_active');
  }
}
