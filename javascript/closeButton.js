const closeHero = document.querySelector(".hero__close");
const heroBox = document.querySelector(".hero");

const closeButton = (closeThis) => {
  closeThis.display = 'none'
}

closeHero.addEventListener("click", (e) => {
  const closeThis = heroBox.style
  closeButton(closeThis)
  
});
export { closeButton }