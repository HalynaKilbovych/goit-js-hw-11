export { renderPictures };

const refs = { 
    searchForm: document.querySelector("#search-form"),
    imageWrapper: document.querySelector(".gallery"),
}
function renderPictures(hits) { 
    const images = hits
    .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
                <a href="${largeImageURL}"> 
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                  <p class="info-item">
                    <b>Likes: </b>${likes}
                  </p>
                  <p class="info-item">
                    <b>Views: </b>${views}
                  </p>
                  <p class="info-item">
                    <b>Comments: </b>${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads: </b>${downloads}
                  </p>
                </div>
        </div>`;
        }
      )
      .join('');
  
    refs.imageWrapper.insertAdjacentHTML('beforeend', images);
}

