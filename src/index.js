import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { PicturesAPI } from './js/pixabayAPI';
import { renderPictures } from './js/render';
import { LoadMoreBtn } from "./js/loadMoreBtn";
import { smoothScroll } from './js/smooth-scroll';



const refs = { 
    searchForm: document.querySelector("#search-form"),
    imageWrapper: document.querySelector(".gallery"),
}

refs.searchForm.addEventListener("submit", onSearchSubmit);

const picturesAPI = new PicturesAPI();
const loadMoreBtn = new LoadMoreBtn("load-more", onLoadMoreBtn);
let simpleLightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
  });

async function onSearchSubmit(e) { 
    e.preventDefault(); 

    picturesAPI.query = e.currentTarget.elements.searchQuery.value.trim();

    if (picturesAPI.query === "") { 
        Notify.warning("Please enter more than 2 symbols");
        return;
    }
    picturesAPI.resetPage(); 
    try {
        const {hits, totalHits} = await picturesAPI.fetchPictures();
        if(totalHits === 0) { 
            Notify.warning("Sorry, there are no images matching your search query. Please try again."); 
            loadMoreBtn.hide();
            refs.imageWrapper.innerHTML = ""

            return; 
        } 
        
        makeInterface(hits);  
        picturesTotal(totalHits); 
        
        loadMoreBtn.show(); 

    } catch (error) {
        onError(); 
    }
}
async function onLoadMoreBtn() { 
    loadMoreBtn.loading(); 

    try {
        const {hits, totalHits} = await picturesAPI.fetchPictures();
        makeInterface(hits); 
        
        loadMoreBtn.endLoading(); 
        smoothScroll();
        if (hits.length < 40) { 
            loadMoreBtn.hide(); 
            Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        onError(); 
    }
}

function makeInterface(hits) { 
    renderPictures(hits);
    simpleLightbox.refresh(); 
    picturesAPI.incrementPage();
}

function picturesTotal(totalHits) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
}
  
function onError() {
    Notify.failure(`OOPS Something is wrong`, {
    });
}

