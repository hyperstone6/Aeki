const productsBtn = document.querySelectorAll("[data-product]");
const roomsBtn = document.querySelectorAll("[data-room]")
const inputField = document.querySelector('[data-search-api]')
const searchForm = document.querySelector('.search')
const inputBtn = document.querySelector('[data-search-button]')

let searchTerm = ''

roomsBtn.forEach(btn => {
    btn.addEventListener('click', navigateToPage)
})

productsBtn.forEach((btn) => {
  btn.addEventListener("click", navigateToPage);
})

searchForm.addEventListener('submit', navigateToPage)

inputBtn.addEventListener('submit', navigateToPage)

export function navigateToPage(e) {
    e.preventDefault()
    if(e.target.dataset.product) {
        searchTerm = e.target.dataset.product
    } else if(e.target.dataset.room) {
        searchTerm = e.target.dataset.room
    } else if(e.target.value != "") {
        searchTerm = inputField.value
    }
        
    localStorage.setItem('findThis', searchTerm)
    window.location.href = 'http://127.0.0.1:5500/gallery.html'
}