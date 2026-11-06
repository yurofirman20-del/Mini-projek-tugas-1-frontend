import { createElement, clearContainer } from '../utils/dom.js';

/**
 * Display loading indicator inside the container
 * @param {HTMLElement} container
 * @param {string} message
 */
export function showLoading(container, message = 'Memuat destinasi wisata...') {
  clearContainer(container);

  const spinner = createElement('div', { class: 'loading-spinner' });
  const text = createElement('p', { class: 'loading-text' }, message);
  const loadingWrapper = createElement(
    'div',
    { class: 'loading-container', 'aria-live': 'polite', role: 'status' },
    spinner,
    text
  );

  container.appendChild(loadingWrapper);
}

/**
 * Remove loading indicator from the container
 * @param {HTMLElement} container
 */
export function hideLoading(container) {
  if (!container) return;
  const loadingElement = container.querySelector('.loading-container');
  if (loadingElement) {
    loadingElement.remove();
  }
}

