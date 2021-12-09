let langToggle = document.querySelector('.lang-change')
let enlgish = document.querySelectorAll('.en')
let french = document.querySelectorAll('.fr')

langToggle.addEventListener('click', toggleLang)

export function toggleLang(e) {
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
}

export function keepSelectedLang() {
    if(sessionStorage.getItem('frenchSelected')) {
        toggleLang()
    } else {
      return
    }
  }
  window.onload = keepSelectedLang()