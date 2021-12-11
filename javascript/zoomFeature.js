let zoomBtn = document.querySelectorAll('[data-zoom]')
let imgContainer = document.querySelector('.modal-img-container')
let modalWindow = document.querySelector('.gallery-modal')

zoomBtn.forEach(btn => {
    btn.addEventListener('click', zoomFunc)
})

export function zoomFunc(e) {
    let zoomImg  = e.target.parentElement.children[0].children[0].src
    imgContainer.style.backgroundImage = `url(${zoomImg})`
    modalWindow.style.display = "block"
}