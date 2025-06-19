import { dashboard, runLandingPage } from './logic.js';

const pageId = document.body.id;

switch (pageId) {
  case 'landing':
    runLandingPage();
    break;
  case 'dashboard':
    dashboard();
    break;
}
