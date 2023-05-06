import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function openModal() {
  const galleryItems = document.querySelectorAll('.gallery a');
  const lightbox = new SimpleLightbox(galleryItems);
  lightbox.on('show.simplelightbox', function () {
    const { defaultOptions } = lightbox;
    defaultOptions.captionDelay = 250;
  });
}

const options = {}
const lightbox = new SimpleLightbox('.gallery a', options);
  
export function refreshModal() {
  lightbox.refresh();
}