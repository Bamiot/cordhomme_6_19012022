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
  console.log(photographer, media)

  displayHeader(photographer)
  displayMedia(media, photographer)
})()
