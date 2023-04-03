import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25261319-41493d7d09d351884ef55fa82';

export class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.perPage = 40;
    this.page = 1;
  }

  async fetchFotos() {
    try {
      const params = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.pageAmount,
        per_page: this.perPage,
      });
      const url = `${BASE_URL}/?${params}`;
      this.incrementPage();
      return await axios.get(url);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}



