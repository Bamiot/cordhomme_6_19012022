function mediaFactory(
  { date, image, video, likes, photographerId, title, price },
  { name, portrait, city, country, id, tagline }
) {
  function getMediaDOM() {
    const path = name.split(' ')[0].split('-').join(' ')
    const figure = document.createElement('figure')
    figure.classList.add('media_card')
    figure.innerHTML = `
      <img src=assets/images/${path}/${image || video} alt='${title}'>
      <figcaption>
        <h2>${title}</h2>
        <span>
          <p>${likes}</p>
          <i class="fas fa-heart"></i>
        </span>
      </figcaption>
    `
    return figure
  }
  return { getMediaDOM }
}
