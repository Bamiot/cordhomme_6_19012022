async function getPhotographer(id) {
  const response = await fetch('./data/photographers.json')
  const data = await response.json()
  const photographer = data.photographers.find((photographer) => photographer.id === id)
  const media = data.media.filter((media) => media.photographerId === id)
  return {
    photographer: photographer,
    media: media
  }
}

async function displayHeader(photographer) {
  // page header
  const photographerHeader = document.querySelector('.photograph-header')
  const html = `
    <h1 class="name">${photographer.name}</h1>
    <div>
      <p class="location">${photographer.city}, ${photographer.country}</p>
      <p class="tagline">${photographer.tagline}</p>
    </div>
    <span class="photograph-like">
      <p class="like-count">${photographer.likeCount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</p>
      <i class="fas fa-heart"></i>
      <p class="price">${photographer.price}€/jours</p>
    </span>
  `

  const div = document.createElement('div')
  div.classList.add('photographer-info')
  div.innerHTML = html
  photographerHeader.prepend(div)
  const img = document.createElement('img')
  img.src = `assets/photographers/${photographer.portrait}`
  photographerHeader.append(img)

  // form header
  const chn = document.createElement('h2')
  chn.innerHTML = `${photographer.name}`
  const contactHeader = document.querySelector('#contact_modal header')
  contactHeader.appendChild(chn)
}

async function displayMedia(medias, photographer) {
  const container = document.querySelector('#media-container')
  for (const media of medias) {
    const mediaModel = mediaFactory(media, photographer)
    const mediaDOM = mediaModel.getMediaDOM()
    container.appendChild(mediaDOM)
  }
}

;(async () => {
  // recupere l'id du photographe dans l'url
  const url = new URL(window.location.href)
  const photographersId = parseInt(url.searchParams.get('id'))

  // Récupère les datas du photographe
  const { photographer, media } = await getPhotographer(photographersId)
  photographer.likeCount = media.map((m) => m.likes).reduce((a, b) => a + b, 0)

  displayHeader(photographer)
  displayMedia(media, photographer)

  const mediasCardDOM = document.querySelectorAll('.media_card')
  const lightbox = document.querySelector('.lightbox')
  const lbMedia = document.querySelector('#lightbox-media')
  const lbTitle = document.querySelector('#lightbox-title')

  document.querySelector('#ctrl-prev').addEventListener('click', () => {})
  document.querySelector('#ctrl-next').addEventListener('click', () => {})
  document.querySelector('#ctrl-close').addEventListener('click', () => {
    lightbox.classList.remove('active')
    lbMedia.innerHTML = ''
  })

  mediasCardDOM.forEach((el, i) => {
    el.addEventListener('click', () => {
      let mediaElement
      const src = `assets/images/${photographer.name
        .split(' ')[0]
        .split('-')
        .join(' ')}/${media[i].image || media[i].video}`
      if (el.classList.contains('video')) {
        mediaElement = document.createElement('video')
        // mediaElement.setAttribute('controls')
        mediaElement.innerHTML = `
          <source src=${src} type='video/mp4'>
          <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>
        `
      } else {
        mediaElement = document.createElement('img')
        mediaElement.src = src
      }
      mediaElement.alt = media[i].title
      lbTitle.innerHTML = media[i].title
      lbMedia.appendChild(mediaElement)
      lightbox.classList.add('active')
    })
  })
})()
