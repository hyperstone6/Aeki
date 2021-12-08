
const closeHeroBtn = document.querySelector(".hero__close");
const closeModalBtn = document.querySelector('.close-modal')

const heroBox = document.querySelector(".hero");
const modalWindow = document.querySelector('.gallery-modal')

closeHeroBtn.addEventListener("click", closeButtonFn);
closeModalBtn.addEventListener("click", closeButtonFn);

function closeButtonFn(e) {
  if(e.target.id == 1) {
    heroBox.style.display = "none"
    sessionStorage.setItem('heroClosed', 'found')
  } else if(e.target.id == 2) {
    modalWindow.style.display = "none"
  }
}

function keepCosed() {
  if(sessionStorage.getItem('heroClosed')) {
    heroBox.style.display = "none"
  } else {
    return
  }
}
window.onload = keepCosed()
export { closeButtonFn, keepCosed }