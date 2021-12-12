const closeHeroBtn = document.querySelector(".hero__close");
const closeModalBtn = document.querySelector(".close-modal");

const heroBox = document.querySelector(".hero");
const modalWindow = document.querySelector(".gallery-modal");

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navList = document.querySelector(".nav__list");
const mediaQuery = window.matchMedia("(min-width: 730px)");

closeHeroBtn.addEventListener("click", closeButtonFn);
closeModalBtn.addEventListener("click", closeButtonFn);

function closeButtonFn(e) {
  if (e.target.id == 1) {
    heroBox.style.display = "none";
    sessionStorage.setItem("heroClosed", "found");
  } else if (e.target.id == 2) {
    modalWindow.style.display = "none";
  }
}

function keepCosed() {
  if (sessionStorage.getItem("heroClosed")) {
    heroBox.style.display = "none";
  } else {
    return;
  }
}

hamburgerBtn.addEventListener("click", toggleNavList);

export function toggleNavList() {
  navList.style.display == "block"
    ? (navList.style.display = "none")
    : (navList.style.display = "block");
}

mediaQuery.addEventListener('change', (e)=> {
  console.log()
  if(e.target.matches) {
    navList.style.display = "flex"
  } else {
    navList.style.display = "none"
  }
})


window.onload = keepCosed();
export { closeButtonFn, keepCosed };