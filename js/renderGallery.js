import galleryItems from '../gallery-items.js';

const galleruEL = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const lightboxButtonEl = document.querySelector('.lightbox__button');
// const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

// одна карточка
const createItem = (option) => {
  const liEl = document.createElement('li');
  liEl.classList.add('gallery__item');

  const linkEl = document.createElement('a');
  liEl.appendChild(linkEl);
  linkEl.classList.add('gallery__link');
  // linkEl.href = option.original;

  const imgEL = document.createElement('img');
  linkEl.appendChild(imgEL);
  imgEL.classList.add('gallery__image');
  imgEL.loading = 'lazy';
  imgEL.src = option.preview;
  imgEL.alt = option.description;
  imgEL.dataset.source = option.original;

  return liEl;
};
// масив карточек
const createGalerry = galleryItems.map(createItem);

// распыляем карточки в разметку
galleruEL.append(...createGalerry);

//////////////////////////////////////////////////////////////////////////

galleruEL.addEventListener('click', onOpenModal);

// open modal
function onOpenModal(evt) {
  //  even.preventDefault(); 
  // if (!evt.target.classList.contains('gallery__image')) {
  //   return;
  // };
  if (evt.target.nodeName !== 'IMG') {
        return;
  };
  

  lightboxEl.classList.add('is-open');
  
  lightboxImageEl.src = evt.target.dataset.source;
  lightboxImageEl.alt = evt.target.alt;

lightboxButtonEl.addEventListener('click', onCloseModal);
lightboxEl.addEventListener('click', onCloseModalOverlay);
  window.addEventListener('keydown', onCloseModalESC);
  window.addEventListener('keydown', onClickSlider);

};



//close modal///////////////////////////////////////////////////

function onCloseModal() {
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';

lightboxButtonEl.removeEventListener('click', onCloseModal);
lightboxEl.removeEventListener('click', onCloseModalOverlay);
window.removeEventListener('keydown', onCloseModalESC);
};

//close modal by overlay////////////////////////////////////////

function onCloseModalOverlay(evt) {
  if (!evt.target.classList.contains('lightbox__overlay')) {
    return;
  };

  onCloseModal();
};


//close modal by Escape//////////////////////////////////////////

function onCloseModalESC(evt) {
  // console.log(evt.key);
  if (evt.key !== 'Escape') {
    return;
  }
  onCloseModal();
};


// разобрать
function onClickSlider(evt) {
  // console.log(evt.key);
  let imgIndex = galleryItems.findIndex(
    image => image.original === lightboxImageEl.src ,
  );

  if (evt.key === 'ArrowLeft') {
    if (imgIndex === 0) {
      imgIndex += galleryItems.length;
    }
    imgIndex -= 1;
  }
  else if (evt.key === 'ArrowRight') {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex = -1;
    }
    imgIndex += 1;
  };

  lightboxImageEl.src = galleryItems[imgIndex].original;
  lightboxImageEl.alt = galleryItems[imgIndex].description;

};