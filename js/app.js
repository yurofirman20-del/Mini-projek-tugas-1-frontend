import { Router } from './router.js';
import { ApiService } from './api.js';
import { DestinationList } from './components/destinationList.js';
import { DestinationDetail } from './components/destinationDetail.js';

/**
 * Main Application Controller
 */
class App {
  constructor() {
    this.container = document.getElementById('app');
    this.apiService = new ApiService();
    this.router = new Router();
    this.listComponent = null;
    this.detailComponent = null;
  }

  /**
   * Initialize application and configure routes
   */
  init() {
    if (!this.container) {
      console.error('Container #app tidak ditemukan!');
      return;
    }

    // Initialize components
    this.listComponent = new DestinationList(this.apiService, this.container, this.router);
    this.detailComponent = new DestinationDetail(this.apiService, this.container, this.router);

    // Route: List Page (Root)
    this.router.on('/', () => {
      this.listComponent.render();
    });

    // Route: Detail Page with ID
    this.router.on('/destination/:id', (params) => {
      const destinationId = params.id;
      this.detailComponent.render(destinationId);
    });

    // Start router
    this.router.init();
  }
}

// Start app once DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

