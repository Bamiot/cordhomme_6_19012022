function photographerFactory(data) {
  const { name, portrait, city, country, id, price, tagline } = data
  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM() {
    const article = document.createElement('article')
    article.classList.add('photographer_card')

    const html = `
    <a href="photographer.html?id=${id}">
      <figure>
        <img src="${picture}" alt="${name}">
        <figcaption>
          <h2>${name}</h2>
        </figcaption>
      </figure>
    </a>
    <p class="location">${city}, ${country}</p>
    <p class="tagline">${tagline}</p>
    <p class="price">${price}€</p>
    `
    article.innerHTML = html

    // const img = document.createElement('img')
    // const h2 = document.createElement('h2')
    // const pLocation = document.createElement('p')
    // const pPrice = document.createElement('p')
    // const pTagline = document.createElement('p')

    // img.setAttribute('src', picture)
    // h2.textContent = name
    // pLocation.className = 'location'
    // pLocation.textContent = `${city}, ${country}`
    // pPrice.className = 'price'
    // pPrice.textContent = `${price}€/jour`
    // pTagline.className = 'tagline'
    // pTagline.textContent = tagline

    // article.appendChild(img)
    // article.appendChild(h2)
    // article.appendChild(pLocation)
    // article.appendChild(pTagline)
    // article.appendChild(pPrice)

    return article
  }
  return { name, picture, getUserCardDOM }
}
