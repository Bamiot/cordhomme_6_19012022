function displayModal() {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
}

function closeModal() {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

document
  .querySelector('.photograph-header > .contact_button')
  .addEventListener('click', displayModal)

document.querySelector('.modal img').addEventListener('click', closeModal)
