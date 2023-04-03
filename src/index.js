import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { cardTmpSearch } from './renderCards';
import NewApiServise from './newApiServise';
import './css/index.css';
const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');

const newApiServise = new NewApiServise();

async function handleSearchFormSubmit(event) {
  event.preventDefault();
  if (!loadMoreBtnEl.classList.contains('is-hidden')) {
    loadMoreBtnEl.classList.add('is-hidden');
  }

  newApiServise.searchQuery =
    event.currentTarget.elements.searchQuery.value.trim();
  newApiServise.resetPage();

  try {
    if (newApiServise.searchQuery === '') {
      clearList();
      Notiflix.Notify.failure('Please enter your search data');
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
      const {
        data: { hits, totalHits },
      } = await newApiServise.fetchFotos();
      clearList();

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        loadMoreBtnEl.classList.remove('is-hidden');
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        galleryEl.innerHTML = cardTmpSearch(hits);
      }
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (err) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    console.log(error.message);
  }
}

async function handleLoadMoreBtnClick() {
  const {
    data: { hits },
  } = await newApiServise.fetchPhotos();

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  galleryEl.innerHTML = cardTmpSearch(hits);

  simpleLightbox();
}

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionDelay: 250,
    captionsData: "alt",
    captionPosition: "bottom"
  });
}

function clearList() {
  galleryEl.innerHTML = '';
}

loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
formEl.addEventListener('submit', handleSearchFormSubmit);
