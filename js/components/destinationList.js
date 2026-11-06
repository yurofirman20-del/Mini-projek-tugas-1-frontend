import { createElement, clearContainer, formatCurrency } from '../utils/dom.js';
import { showLoading, hideLoading } from './loading.js';
import { showError } from './error.js';

/**
 * Component for displaying list of destinations
 */
export class DestinationList {
  constructor(apiService, container, router) {
    this.apiService = apiService;
    this.container = container;
    this.router = router;
    this.destinations = [];
    this.loading = false;
    this.error = null;
  }

  /**
   * Render destination list page
   */
  async render() {
    this.loading = true;
    showLoading(this.container, 'Memuat daftar destinasi wisata...');

    try {
      this.destinations = await this.apiService.getAllDestinations();
      this.loading = false;
      hideLoading(this.container);

      if (!this.destinations || this.destinations.length === 0) {
        this._renderEmptyState();
        return;
      }

      this._renderList();
    } catch (err) {
      this.loading = false;
      this.error = err.message || 'Gagal memuat data destinasi.';
      showError(this.container, this.error, () => this.render(), null);
    }
  }

  /**
   * Render empty state when no destinations returned
   */
  _renderEmptyState() {
    clearContainer(this.container);

    const emptyBox = createElement('div', { class: 'empty-state' },
      createElement('div', { class: 'empty-icon' }, '🏝️'),
      createElement('h3', { class: 'empty-title' }, 'Belum Ada Destinasi Wisata'),
      createElement('p', { class: 'empty-desc' }, 'Saat ini belum ada data destinasi wisata yang tersedia.')
    );

    this.container.appendChild(emptyBox);
  }

  /**
   * Render grid list of destinations
   */
  _renderList() {
    clearContainer(this.container);

    // Hero section / page header
    const headerTitle = createElement('h1', { class: 'page-title' }, 'Jelajahi Destinasi Wisata');
    const headerSubtitle = createElement(
      'p',
      { class: 'page-subtitle' },
      'Temukan keindahan alam dan warisan budaya nusantara yang memukau'
    );
    const headerSection = createElement('div', { class: 'page-header' }, headerTitle, headerSubtitle);

    // Cards Grid
    const grid = createElement('div', { class: 'destinations-grid' });

    for (const item of this.destinations) {
      const card = this._createCard(item);
      grid.appendChild(card);
    }

    const listSection = createElement('div', { class: 'destinations-container' }, headerSection, grid);
    this.container.appendChild(listSection);
  }

  /**
   * Create a single destination card
   * @param {Object} item
   * @returns {HTMLElement}
   */
  _createCard(item) {
    const card = createElement('article', {
      class: 'destination-card',
      'data-id': item.id,
      tabindex: '0',
      role: 'button',
      'aria-label': `Lihat detail ${item.name}`,
      onClick: () => this.handleDestinationClick(item.id),
      onKeydown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleDestinationClick(item.id);
        }
      }
    });

    // Image container
    const imageWrapper = createElement('div', { class: 'card-image-wrapper' });
    const img = createElement('img', {
      src: item.imageUrl,
      alt: item.name,
      class: 'card-image',
      loading: 'lazy',
      onError: (e) => {
        // Fallback placeholder image if image URL fails
        e.target.onerror = null;
        e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';
      }
    });
    const priceBadge = createElement('span', { class: 'card-badge' }, formatCurrency(item.ticketPrice));
    imageWrapper.appendChild(img);
    imageWrapper.appendChild(priceBadge);

    // Body container
    const body = createElement('div', { class: 'card-body' });
    const location = createElement('div', { class: 'card-location' }, '📍 ' + (item.location || 'Indonesia'));
    const name = createElement('h2', { class: 'card-title' }, item.name);
    
    // Short description snippet
    const shortDesc = item.description 
      ? (item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description)
      : '';
    const desc = createElement('p', { class: 'card-description' }, shortDesc);

    // Action button
    const footer = createElement('div', { class: 'card-footer' },
      createElement('span', { class: 'card-link' }, 'Lihat Detail →')
    );

    body.appendChild(location);
    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(footer);

    card.appendChild(imageWrapper);
    card.appendChild(body);

    return card;
  }

  /**
   * Handle card click to navigate to detail
   * @param {string} id
   */
  handleDestinationClick(id) {
    if (this.router) {
      this.router.navigate(`/destination/${id}`);
    }
  }

  /**
   * Clean up component
   */
  destroy() {
    clearContainer(this.container);
  }
}

