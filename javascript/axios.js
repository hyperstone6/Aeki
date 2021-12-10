let galleryImgs = document.querySelector(".main__gallery__image-box");
let searchTerm = localStorage.getItem("findThis");
let imgData = [];

const callToAPI = async (searchTerm) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: searchTerm },
    headers: {
      Authorization: "Client-ID a398eWmmZNE-az0VCXEXY5OYR4o0_fsGpZM7kpXdFIs",
    },
  });
  imgData = response.data.results.map((img) => {
    let mainGallery = document.querySelector('.main__gallery');
    let galleryOverlay = document.createElement('div')
    galleryOverlay.classList.add("main__gallery__overlay")
    let renderGallery = `
        <div class="main__gallery__item">
          <img
            class="main__gallery__image-box"
            src=${img.urls.regular}
            alt=""
          />
        </div>
        <button class="zoom-button en" data-zoom>Zoom In</button>
        <button class="zoom-button fr hidden" data-zoom>Zoomer</button>
    `;
    galleryOverlay.innerHTML = renderGallery
    mainGallery.appendChild(galleryOverlay)
  });
};

callToAPI(searchTerm);