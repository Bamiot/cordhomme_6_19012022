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

async function displayData() {}

async function init() {
  // recupere l'id du photographe dans l'url
  const url = new URL(window.location.href)
  const photographersId = parseInt(url.searchParams.get('id'))

  // Récupère les datas du photographe
  const { photographer, media } = await getPhotographer(photographersId)
  console.log(photographer, media)
  displayData()
}

init()
