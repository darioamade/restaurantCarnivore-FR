
'use strict';

const header = document.querySelector('.header');
const sectionOne = document.querySelector('section');
const navBanner = document.querySelector('.nav-banner');
const navTop = document.querySelector('.nav');
const btn = document.getElementById('btn');
const circle = document.querySelector('.circle');
const textActive = document.querySelector('.text-active');
const textHidden = document.querySelector('.text-hidden');
const rot = document.querySelector('.rot');

if(circle){
  circle.onclick = function(){
    textHidden.classList.toggle('text-active');
    circle.classList.toggle('rot');
  
  }
}



const sectionOneOptions = {
  rootMargin: '-10px 0px 0px 0px',
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add('nav-scrolled');
      navBanner.classList.add('nav-element');
      navTop.classList.add('nav-scrolled');

    } else {
      header.classList.remove('nav-scrolled');
      navBanner.classList.remove('nav-element');
      navTop.classList.add('nav-scrolled');
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);



const hamMenu = document.querySelector('.menu-open');
const offScreenMenu = document.querySelector('.off-screen-menu');
const yearSpan = document.querySelector('#copyright')


hamMenu.addEventListener('click', ()=> {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active')
})

const currentYear = new Date();
yearSpan.innerText = currentYear.getFullYear();









// lazy loadinh images
const imgTargets = document.querySelectorAll('img[data-src');

const loadImg = function(entries, observer){
  const [entry] = entries;
  console.log(entry)
  if(!entry.isIntersecting)  return

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function()
  {
    entry.target.classList.remove('lazy-img')
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, 
  {
    root: null, 
    threshold: 0

});


imgTargets.forEach(img=> imgObserver.observe(img));


// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();
}



// Swiper Slider
new Swiper('.card-wrapper ', {
  loop: true,
  spaceBetween: 10,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints:{
    0: {
      slidesPerView : 1
    },
      768: {
        slidesPerView : 2
    },
    1025: {
      slidesPerView : 3
    },
  }
});



/*----------------------------------------------------------------*/
/*---------------- carousel-slider ------------------*/  
/*----------------------------------------------------------------*/
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})



function changeOption(){
   var selectedValue = document.getElementById('user_level').value;
    btn.classList.remove('btn-active')
   }
   
