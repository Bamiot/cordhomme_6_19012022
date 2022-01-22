function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data
  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const article = document.createElement('article')
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    const h2 = document.createElement('h2')
    h2.textContent = name
    const pLocation = document.createElement('p')
    pLocation.textContent = `${city}, ${country}`
    const pPrice = document.createElement('p')
    pPrice.textContent = `${price}€/jour`
    const pTagline = document.createElement('p')
    pTagline.textContent = tagline
    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(pLocation)
    article.appendChild(pTagline)
    article.appendChild(pPrice)
    return article
  }
  return { name, picture, getUserCardDOM }
}
