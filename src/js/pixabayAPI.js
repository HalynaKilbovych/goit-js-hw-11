import axios from "axios";

const API_KEY = "19426296-0adceb4884beb75ab0f5599b5";

axios.defaults.baseURL = "https://pixabay.com/api/"; 

export class PicturesAPI { 
    constructor() { 
        this.searchQuery = "";
        this.page = 1; 
    }

    async fetchPictures() { 
        const options = new URLSearchParams({
            key: API_KEY, 
            page: this.page, 
            q: this.searchQuery,
            image_type: 'photo', 
            orientation: 'horizontal', 
            safesearch: 'true', 
            per_page: 40, 
        });
        const {data} = await axios(`?${options}`); 
        return data; 
    }
    incrementPage() {
        this.page += 1;
      }
    resetPage() { 
        this.page = 1;
    }
    get query() { 
        return this.searchQuery; 
    }
    set query(newQuery) { 
        this.searchQuery = newQuery; 
    }
}
