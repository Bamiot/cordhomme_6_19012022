import mediaFactory from '../factories/media.js'
import photographerFactory from '../factories/photographer.js'

async function getPhotographer(id) {
  const response = await fetch('../data/photographers.json')
  const data = await response.json()
  const photographer = data.photographers.find((photographer) => photographer.id === id)
  const media = data.media.filter((media) => media.photographerId === id)
  return {
    photographer: photographer,
    media: media
  }
}

// main
;(async () => {
  // recupere l'id du photographe dans l'url
  const url = new URL(window.location.href)
  const photographersId = parseInt(url.searchParams.get('id'))

  // Récupère les datas du photographe
  const { photographer, media } = await getPhotographer(photographersId)
  photographer.likeCount = media.map((m) => m.likes).reduce((a, b) => a + b, 0)

  const lightbox = document.querySelector('.lightbox')
  const lbMedia = document.querySelector('#lightbox-media')
  const lbTitle = document.querySelector('#lightbox-title')

  let lbIndex = 0

  async function displayHeader() {
    const photographerModel = photographerFactory(photographer)

    // page header
    const photographerHeader = document.querySelector('.photograph-header')
    photographerHeader.prepend(photographerModel.getHeaderInfoDOM())
    photographerHeader.append(photographerModel.getHeaderPortraitDOM())

    // form header
    document
      .querySelector('#contact_modal header')
      .appendChild(photographerModel.getFormHeaderDOM())
  }

  async function displayMedia(medias) {
    const container = document.querySelector('#media-container')
    container.innerHTML = ''
    for (const media of medias) {
      const mediaModel = mediaFactory(media, photographer)
      const mediaDOM = mediaModel.getMediaDOM()
      container.appendChild(mediaDOM)
    }
  }

  function openLightbox(m) {
    const mediaModel = mediaFactory(m, photographer)
    const mediaElement = mediaModel.getLightboxMediaDOM()

    lbMedia.innerHTML = ''
    lbTitle.innerHTML = m.title
    lbMedia.appendChild(mediaElement)
    lightbox.classList.add('active')
  }

  function lbClose() {
    lightbox.classList.remove('active')
    lbMedia.innerHTML = ''
  }

  function lbPrev() {
    lbIndex--
    if (lbIndex < 0) lbIndex = media.length - 1
    openLightbox(media[lbIndex])
  }

  function lbNext() {
    lbIndex++
    if (lbIndex > media.length - 1) lbIndex = 0
    openLightbox(media[lbIndex])
  }

  document.querySelector('#ctrl-prev').addEventListener('click', lbPrev)
  document.querySelector('#ctrl-next').addEventListener('click', lbNext)
  document.querySelector('#ctrl-close').addEventListener('click', lbClose)

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape':
        lbClose()
        break
      case 'ArrowLeft':
        lbPrev()
        break
      case 'ArrowRight':
        lbNext()
        break
      default:
        break
    }
  })

  displayHeader(photographer)
  displayMedia(media, photographer)

  const mediasCardDOM = document.querySelectorAll('.media_card')
  mediasCardDOM.forEach((el, i) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('img') || e.target.closest('video')) {
        lbIndex = i
        openLightbox(media[lbIndex])
      }
    })
  })
})()
