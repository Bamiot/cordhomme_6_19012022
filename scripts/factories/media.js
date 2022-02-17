export default function mediaFactory(
  { date, image, video, likes, photographerId, title, price },
  { name, portrait, city, country, id, tagline }
) {
  const path = (el) => `../assets/images/${name.split(' ')[0].split('-').join(' ')}/${el}`

  function videoDOM() {
    const videoEL = document.createElement('video')
    videoEL.innerHTML = `
      <source src="${path(video)}" type='video/mp4'>
      <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>`
    return videoEL
  }

  function imageDOM() {
    const img = document.createElement('img')
    img.src = `${path(image)}`
    img.alt = title
    return img
  }

  function getMediaDOM() {
    const figure = document.createElement('figure')
    figure.classList.add('media_card')
    figure.classList.toggle('video', !!video)
    figure.innerHTML = `
      <figcaption>
        <h2>${title}</h2>
        <span id="like">
          <p>${likes}</p>
          <i class="fas fa-heart" aria-label='likes'></i>
        </span>
      </figcaption>
    `
    figure.prepend(image ? imageDOM() : videoDOM())
    return figure
  }

  function getLightboxMediaDOM() {
    let mediaElement
    if (video) {
      mediaElement = videoDOM()
    } else {
      mediaElement = imageDOM()
    }
    return mediaElement
  }

  return { getMediaDOM, getLightboxMediaDOM }
}
