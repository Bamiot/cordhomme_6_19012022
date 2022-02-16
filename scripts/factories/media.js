function mediaFactory(
  { date, image, video, likes, photographerId, title, price },
  { name, portrait, city, country, id, tagline }
) {
  function getMediaDOM() {
    const path = name.split(' ')[0].split('-').join(' ')
    const figure = document.createElement('figure')
    figure.classList.add('media_card')
    figure.classList.toggle('video', !!video)
    figure.innerHTML = `
      ${
        image
          ? `<img src=assets/images/${path}/${image} alt='${title}'>`
          : `
          <video>
            <source src=assets/images/${path}/${video} type='video/mp4'>
            <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>
          </video>
        `
      }
      <figcaption>
        <h2>${title}</h2>
        <span>
          <p>${likes}</p>
          <i class="fas fa-heart" aria-label='likes' ></i>
        </span>
      </figcaption>
    `
    return figure
  }
  return { getMediaDOM }
}
