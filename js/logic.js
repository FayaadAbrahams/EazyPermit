function runLandingPage() {
    const openFormBtn = document.getElementById('openFormBtn');
    const choiceForm = document.getElementById('choiceForm');
    const landingPage = document.querySelector('.landing-page-container');
    const optionsBox = document.querySelector('.choice-form .options');
    const closeBtn = document.querySelector('.close-btn');

    if (!openFormBtn || !choiceForm || !landingPage || !optionsBox || !closeBtn) return;

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

    closeBtn.addEventListener('click', () => {
        choiceForm.style.display = 'none';
        landingPage.classList.remove('blur');
    });
}

function runRegisterPage() {
    console.log("Hello!");
}

export { runLandingPage, runRegisterPage };