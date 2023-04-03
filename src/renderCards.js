export default function cardTmpSearch (images) {
  return images
    .map(({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) => {
      return `
        <div class="photo-card">
          <a href="${webformatURL}">
            <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
        </div>
      `;
    })
    .join("");
}







// import axios from "axios";

// const API_KEY = '34785269-2da0cadfc3fd212a10b88586f';
// const BASE_URL = 'https://pixabay.com/api/';

// async function fetchImages(query, page = 1) {
//   const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
//   return response.data;
// }

// export default fetchImages;