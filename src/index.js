import { createMarkup } from './js/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from "./js/fetch"
import scrollBy from './js/scroll';
import {
    openModal,
    refreshModal,
  } from './js/simpleLightBox';
  

  const form = document.querySelector('.search-form');
  const galleryEl = document.querySelector('.gallery');
  const obserTarget = document.querySelector('.js-elem');
  const lastMessage = document.querySelector('.js-message');
  let currentPage = 0;
  let queryParametres = "";
  let options = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0,
  };
  let observer = new IntersectionObserver(LoadMore, options);
  form.addEventListener('submit', onSearchForm);
  galleryEl.addEventListener('click', evt => {
    evt.preventDefault();
  });
  function onSearchForm(evt) {
    evt.preventDefault();
    queryParametres = evt.currentTarget.elements.searchQuery.value;
    galleryEl.innerHTML = '';
    if (!queryParametres) {
      Notify.warning('Please, fill the field');
      return;
    }
    if(observer) {
      observer.disconnect();
      observer = null;
    }
    observer = new IntersectionObserver(LoadMore, options);
    observer.observe(obserTarget);
    if (currentPage > 0) {
      galleryEl.innerHTML = ''
      currentPage = 0;
    }
  }
  function LoadMore(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentPage += 1;
        renderImagesLoadMore();
      }
    });
  }

async function renderImagesLoadMore() {
  try {
    const response = await getImages(queryParametres, currentPage);
    const dataArray = response.data.hits;

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(dataArray));
    if (dataArray.length * currentPage > response.data.totalHits) {
      observer.unobserve(obserTarget);
      lastMessage.textContent = `Hooray! All images has finished.`;
    }
    scrollBy();

    const newGalleryItems = galleryEl.querySelectorAll('.gallery a');
    const lightbox = new SimpleLightbox(newGalleryItems);
    lightbox.destroy(); 
    newGalleryItems.forEach(item => {
      item.addEventListener('click', elem => {
        elem.preventDefault();
        lightbox.open(item.href);
      });
    });
    refreshModal();
  } catch (error) {
    console.log(error);
  }
}

async function renderImagesSubmit() {
  try {
    const response = await getImages(queryParametres);
    const dataArray = response.data.hits;
    galleryEl.innerHTML = createMarkup(dataArray);
    if (!dataArray.length) 
    throw new Error('not found');
    if (dataArray.length)
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    openModal();
    scrollBy();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    galleryEl.innerHTML = '';
  }
}
