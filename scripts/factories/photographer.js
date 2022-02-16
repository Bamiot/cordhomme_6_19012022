function photographerFactory({ name, portrait, city, country, id, price, tagline }) {
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

    return article
  }
  return { name, picture, getUserCardDOM }
}
