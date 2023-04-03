import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardTmpSearch from './renderCards';
import NewApiServise from './newApiServise';
import './css/index.css';
const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');

const newApiServise = new NewApiServise();


let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});


function addIsHiddenBtn() {
  loadMoreBtnEl.classList.add('is-hidden');
}
function removeIsHiddenBtn() {
  loadMoreBtnEl.classList.remove('is-hidden');
}

addIsHiddenBtn();

async function handleSearchFormSubmit(event) {
  event.preventDefault();

  try {
    // if (!loadMoreBtnEl.classList.contains('is-hidden')) {
    //   loadMoreBtnEl.classList.add('is-hidden');
    // }

    newApiServise.searchQuery = formEl.elements.searchQuery.value.trim();
    newApiServise.resetPage();

    if (newApiServise.searchQuery === '') {
      clearList();
      Notiflix.Notify.failure('Please enter your search data');
    } else {
      removeIsHiddenBtn();
      const response = await newApiServise.fetchFotos();
      const {
        data: { hits, totalHits, total },
      } = response;
      clearList();

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        removeIsHiddenBtn();
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        galleryEl.insertAdjacentHTML('beforeend', cardTmpSearch(hits));
        lightbox.refresh();
      }
      // removeIsHiddenBtn()

      if (hits.length == total) {
        removeIsHiddenBtn;
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function handleLoadMoreBtnClick() {
  newApiServise.incrementPage();
  const response = await newApiServise.fetchFotos();
  const {
    data: { hits },
  } = response;

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  galleryEl.insertAdjacentHTML('beforeend', cardTmpSearch(hits));
  lightbox.refresh();

}


function clearList() {
  galleryEl.innerHTML = '';
}

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
formEl.addEventListener('submit', handleSearchFormSubmit);
