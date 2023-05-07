export function createMarkup(array) {
    return array
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
          return `
          <div class="photo-card gallery-item">
          <a href="${largeImageURL}" class="photo-link">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width=500 height=350>
    </a>
    <div class="inform-list">
      <p class="inform-item">
        <b>Likes </b>${likes}
      </p>
      <p class="inform-item">
        <b>Views </b>${views}
      </p>
      <p class="inform-item">
        <b>Comments </b>${comments}
      </p>
      <p class="inform-item">
        <b>Downloads </b>${downloads}
      </p>
    </div>
  </div>`;
        }
      )
      .join('');
  }