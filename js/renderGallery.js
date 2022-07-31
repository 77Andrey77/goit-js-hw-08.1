import galleryItems from '../gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
// const overlayEl = document.querySelector('.lightbox__overlay');
const imageEl = document.querySelector('.lightbox__image');
const closeBtnEl = document.querySelector('.lightbox__button');

//разметка для одной картинки
const createItem = (option) =>
  `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${option.original}"
  >
    <img
    loading="lazy"
      class="gallery__image"
      src="${option.preview}"
      data-source="${option.original}"
      alt="${option.description}"
    />
  </a>
</li>`;

//делаем галерею
const createGalerry = galleryItems.map(createItem).join('');

galleryEl.innerHTML = createGalerry;

/////////////////////
//делегирование событий

galleryEl.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !=='IMG') {
    return;
  };
  //  if (!e.target.classList.contains('gallery__image')) {
  //   return;
  // };

  modalEl.classList.add('is-open');
  imageEl.src = e.target.dataset.source;
  imageEl.alt = e.target.alt;
  
  closeBtnEl.addEventListener('click', onCloseModal, { once: true });
  modalEl.addEventListener('click', onCloseModalOverlay, { once: true });
  window.addEventListener('keydown', onCloseModalESC, { once: true });
  window.addEventListener('keydown', onScrollImg);
};

//закрытие модалки
function onCloseModal() {
  modalEl.classList.remove('is-open');
  imageEl.src = '';
  imageEl.alt = '';
};

// закрытие модалки по overlay
function onCloseModalOverlay(e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  }
  onCloseModal();
};

// закрытие модалки по Escape
function onCloseModalESC(e) {
  if (e.key !== 'Escape') {
    return;
  }
  onCloseModal();
};

function onScrollImg(e) {
  let imgIndex = galleryItems.findIndex(img => img.original === imageEl.src);

  if (e.key === 'ArrowLeft') {
    if (imgIndex === 0) {
      imgIndex = galleryItems.length-1;
    } else {
      imgIndex -= 1;
    }
  } else if (e.key === 'ArrowRight') {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex = 0;
    } else {
      imgIndex += 1;
    }
  }
  imageEl.src = galleryItems[imgIndex].original;
  imageEl.alt = galleryItems[imgIndex].description;
};