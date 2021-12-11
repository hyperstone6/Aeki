let langToggle = document.querySelector('.lang-change')
let enlgish = document.querySelectorAll('.en')
let french = document.querySelectorAll('.fr')
let carts = document.querySelectorAll('[data-cart-button]');
let zoomBtn = document.querySelectorAll('[data-zoom]')

langToggle.addEventListener('click', toggleLang)

export function toggleLang() {
    for(let i = 0; i < french.length; i++) {
        if(french[i].classList.contains('hidden')) {
            french[i].classList.remove('hidden')
            enlgish[i].classList.add('hidden')
            langToggle.src = './icons/en.png'
            sessionStorage.setItem('frenchSelected', 'true')
        } else {
            enlgish[i].classList.remove('hidden')
            french[i].classList.add('hidden')
            langToggle.src = './icons/fr.png'
            sessionStorage.clear('frenchSelected')
        }
    }
    for(let btn of carts) {
        if(sessionStorage.getItem('frenchSelected')) {
            btn.innerText = "Ajouter"
        } else {
            btn.innerText = "Add to cart"
        }
    }
    for(let btn of zoomBtn) {
        if(sessionStorage.getItem('frenchSelected')) {
            btn.innerText = "Zoomer"
        } else {
            btn.innerText = "Zoom In"
        }
    }
}

export function keepSelectedLang() {
    if(sessionStorage.getItem('frenchSelected')) {
        toggleLang()
    } else {
      return
    }
  }
  window.onload = keepSelectedLang()