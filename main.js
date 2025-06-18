document.addEventListener("DOMContentLoaded", () => {
    const openFormBtn = document.getElementById('openFormBtn');
    const choiceForm = document.getElementById('choiceForm');
    const landingPage = document.querySelector('.landing-page-container');
    const optionsBox = document.querySelector('.choice-form .options');
    const closeBtn = document.querySelector('.close-btn');
  
    // Show form and blur landing page
    openFormBtn.addEventListener('click', () => {
      choiceForm.style.display = 'flex';
      landingPage.classList.add('blur');
    });
  
    // Close form on outside click
    choiceForm.addEventListener('click', (e) => {
      if (!optionsBox.contains(e.target)) {
        choiceForm.style.display = 'none';
        landingPage.classList.remove('blur');
      }
    });
  
    // Close form with close button
    closeBtn.addEventListener('click', () => {
      choiceForm.style.display = 'none';
      landingPage.classList.remove('blur');
    });
  });
  