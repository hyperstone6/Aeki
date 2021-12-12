const productsBtn = document.querySelectorAll("[data-product]");
const roomsBtn = document.querySelectorAll("[data-room]")
const inputField = document.querySelector('[data-search-api]')
const searchForm = document.querySelector('.search')
const inputBtn = document.querySelector('[data-search-button]')
const inspirations = document.querySelector('[data-houses]')

let searchTerm = ''

roomsBtn.forEach(btn => {
    btn.addEventListener('click', navigateToPage)
})
productsBtn.forEach((btn) => {
  btn.addEventListener('click', navigateToPage);
})

inspirations.addEventListener('click', navigateToPage)
searchForm.addEventListener('submit', navigateToPage)
inputBtn.addEventListener('submit', navigateToPage)

export function navigateToPage(e) {
    e.preventDefault()
    if(e.target.dataset.product) {
        searchTerm = e.target.dataset.product
    } else if(e.target.dataset.room) {
        searchTerm = e.target.dataset.room
    } else if (e.target.dataset.houses) {
        searchTerm = e.target.dataset.houses
    } else if (e.target.value != "") {
        searchTerm = inputField.value
    }
        
    localStorage.setItem('findThis', searchTerm)
    window.location.href = window.location.href + 'gallery.html'
}