

window.addEventListener("load", (event) => {
  const openFormBtn = document.getElementById('openFormBtn');
  const choiceForm = document.getElementById('choiceForm');
  const landingPage = document.querySelector('.landing-page-container');
  const optionsBox = document.querySelector('.choice-form .options');
  const closeBtnPopUp = document.querySelector('.close-btn-popup');

  if (!openFormBtn || !choiceForm || !landingPage || !optionsBox ) return;

  openFormBtn.addEventListener('click', () => {
    choiceForm.style.display = 'flex';
    landingPage.classList.add('blur');
  });

  choiceForm.addEventListener('click', (e) => {
    if (!optionsBox.contains(e.target)) {
      choiceForm.style.display = 'none';
      landingPage.classList.remove('blur');
    }
  });

  closeBtnPopUp.addEventListener('click', () => {
    choiceForm.style.display = 'none';
    landingPage.classList.remove('blur');
  });

})
