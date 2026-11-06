import { createElement, clearContainer, formatCurrency } from '../utils/dom.js';
import { showLoading, hideLoading } from './loading.js';
import { showError } from './error.js';

/**
 * Component for displaying single destination detail
 */
export class DestinationDetail {
  constructor(apiService, container, router) {
    this.apiService = apiService;
    this.container = container;
    this.router = router;
    this.destination = null;
    this.loading = false;
    this.error = null;
  }

  /**
   * Render destination detail page
   * @param {string} id
   */
  async render(id) {
    this.loading = true;
    showLoading(this.container, 'Memuat detail destinasi...');

    try {
      if (!id) {
        throw new Error('ID destinasi tidak ditemukan.');
      }

      this.destination = await this.apiService.getDestinationById(id);
      this.loading = false;
      hideLoading(this.container);

      if (!this.destination) {
        showError(this.container, 'Destinasi tidak ditemukan', null, '#/');
        return;
      }

      this._renderDetail();
    } catch (err) {
      this.loading = false;
      if (err.status === 404 || err.message?.toLowerCase().includes('not found')) {
        showError(this.container, 'Destinasi tidak ditemukan', null, '#/');
      } else {
        showError(this.container, err.message || 'Gagal memuat detail destinasi.', () => this.render(id), '#/');
      }
    }
  }

  /**
   * Render detail page DOM
   */
  _renderDetail() {
    clearContainer(this.container);
    const dest = this.destination;

    // Navigation back button
    const backBtn = createElement(
      'button',
      {
        class: 'back-btn',
        type: 'button',
        'aria-label': 'Kembali ke daftar destinasi',
        onClick: () => this.handleBackClick()
      },
      '← Kembali ke Daftar'
    );

    // Left column: Image
    const imageContainer = createElement('div', { class: 'detail-image-container' });
    const img = createElement('img', {
      src: dest.imageUrl,
      alt: dest.name,
      class: 'detail-image',
      onError: (e) => {
        e.target.onerror = null;
        e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80';
      }
    });
    imageContainer.appendChild(img);

    // Right column: Content Info
    const contentContainer = createElement('div', { class: 'detail-content-container' });

    // Location tag
    const location = createElement('div', { class: 'detail-location' }, '📍 ' + (dest.location || 'Indonesia'));

    // Title / Name
    const title = createElement('h1', { class: 'detail-title' }, dest.name);

    // Ticket Price Card
    const priceBox = createElement('div', { class: 'detail-price-box' },
      createElement('span', { class: 'price-label' }, 'Harga Tiket Masuk:'),
      createElement('span', { class: 'price-value' }, formatCurrency(dest.ticketPrice))
    );

    // Description Section
    const descSection = createElement('div', { class: 'detail-section' },
      createElement('h3', { class: 'section-heading' }, 'Tentang Destinasi'),
      createElement('p', { class: 'detail-description' }, dest.description || 'Tidak ada deskripsi tersedia.')
    );

    // Additional info highlights
    const highlights = createElement('div', { class: 'detail-highlights' },
      createElement('div', { class: 'highlight-item' },
        createElement('span', { class: 'highlight-icon' }, '🧭'),
        createElement('span', { class: 'highlight-text' }, 'Wisata Rekomendasi')
      ),
      createElement('div', { class: 'highlight-item' },
        createElement('span', { class: 'highlight-icon' }, '📸'),
        createElement('span', { class: 'highlight-text' }, 'Spot Foto Menarik')
      ),
      createElement('div', { class: 'highlight-item' },
        createElement('span', { class: 'highlight-icon' }, '🌿'),
        createElement('span', { class: 'highlight-text' }, 'Pesona Alam & Budaya')
      )
    );

    contentContainer.appendChild(location);
    contentContainer.appendChild(title);
    contentContainer.appendChild(priceBox);
    contentContainer.appendChild(descSection);
    contentContainer.appendChild(highlights);

    // Main detail card
    const detailCard = createElement(
      'div',
      { class: 'detail-card' },
      imageContainer,
      contentContainer
    );

    const detailWrapper = createElement(
      'div',
      { class: 'detail-page-wrapper' },
      backBtn,
      detailCard
    );

    this.container.appendChild(detailWrapper);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Handle back button click
   */
  handleBackClick() {
    if (this.router) {
      this.router.navigate('/');
    }
  }

  /**
   * Clean up component
   */
  destroy() {
    clearContainer(this.container);
  }
}

