import { runLandingPage } from './logic.js';
import { runRegisterPage } from './logic.js';

const pageId = document.body.id;

switch (pageId) {
  case 'landing':
    runLandingPage();
    break;
  case 'register-page':
    runRegisterPage();
    break;
}
