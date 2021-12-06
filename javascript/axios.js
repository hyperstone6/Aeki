const productsBtn = document.querySelectorAll("[data-product]");
const roomsBtn = document.querySelectorAll("[data-room]")
let seachTerm = "";
let imgData = []

roomsBtn.forEach(btn => {
    btn.addEventListener('click', btn => {
        btn.preventDefault()
        seachTerm = btn.target.innerText
        callToAPI(seachTerm)
    })
})

productsBtn.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    btn.preventDefault();
    seachTerm = btn.target.innerText;
    callToAPI(seachTerm)
  });
});

export const callToAPI = async (seachTerm) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: seachTerm },
    headers: {
      Authorization: "Client-ID a398eWmmZNE-az0VCXEXY5OYR4o0_fsGpZM7kpXdFIs",
    },
  })
  imgData = response.data.results.map(img => img.urls.regular)
  console.log(imgData)
};