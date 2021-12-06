const track = document.querySelector(".carousel__slides");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__btn--right");
const previousButton = document.querySelector(".carousel__btn--left");
const navButtons = document.querySelector('.carousel__nav__buttons')
const dots = Array.from(navButtons.children)

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

export const moveTargetSlide = (track, currentSlide, targetSlide) => {
  if (targetSlide !== null) {
    nextButton.style.backgroundColor = "#e89f71"
    previousButton.style.backgroundColor = '#e89f71'
    if(!targetSlide) return
    track.style.transform = "translateX( -" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current__img");
    targetSlide.classList.add("current__img");
  } 
};

export const updateDots = (currentDot, targetDot) => {
  if(targetDot !== null) {
    currentDot.classList.remove("carousel__nav__btn--current");
    targetDot.classList.add("carousel__nav__btn--current");
  }
}

nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current__img");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = navButtons.querySelector('.carousel__nav__btn--current')
  const nextDot = currentDot.nextElementSibling
  moveTargetSlide(track, currentSlide, nextSlide);

  updateDots(currentDot, nextDot)
  if(nextSlide === null) {
    nextButton.style.backgroundColor = "#ffdbc4"
  }
});

previousButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current__img");
  const currentDot = navButtons.querySelector('.carousel__nav__btn--current')
  const previousSlide = currentSlide.previousElementSibling;
  moveTargetSlide(track, currentSlide, previousSlide);
  const previousDot = currentDot.previousElementSibling
  updateDots(currentDot, previousDot)
  if(previousSlide === null) {
    previousButton.style.backgroundColor = "#ffdbc4"
  }
});

navButtons.addEventListener('click', e => {
    const targetDot = e.target.closest('button')
    const currentSlide = track.querySelector('.current__img')
    const currentDot = navButtons.querySelector('.carousel__nav__btn--current')
    const targetIndex = dots.findIndex(dot => dot === targetDot)

    const targetSlide = slides[targetIndex]

    moveTargetSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot)
})