import { createElement, clearContainer } from '../utils/dom.js';

/**
 * Display error message inside the container
 * @param {HTMLElement} container
 * @param {string} message
 * @param {Function} [onRetry] - Optional retry callback
 * @param {string} [backUrl] - Optional URL to go back
 */
export function showError(container, message, onRetry = null, backUrl = '#/') {
  clearContainer(container);

  const icon = createElement('div', { class: 'error-icon' }, '⚠️');
  const title = createElement('h3', { class: 'error-title' }, 'Terjadi Kendala');
  const desc = createElement('p', { class: 'error-message' }, message);

  const actions = createElement('div', { class: 'error-actions' });

  if (typeof onRetry === 'function') {
    const retryBtn = createElement(
      'button',
      {
        class: 'btn btn-primary',
        type: 'button',
        onClick: onRetry
      },
      'Coba Lagi'
    );
    actions.appendChild(retryBtn);
  }

  if (backUrl) {
    const backBtn = createElement(
      'a',
      {
        href: backUrl,
        class: 'btn btn-secondary'
      },
      'Kembali ke Beranda'
    );
    actions.appendChild(backBtn);
  }

  const errorBox = createElement(
    'div',
    { class: 'error-card', role: 'alert' },
    icon,
    title,
    desc,
    actions
  );

  const errorContainer = createElement('div', { class: 'error-container' }, errorBox);
  container.appendChild(errorContainer);
}

/**
 * Remove error message from the container
 * @param {HTMLElement} container
 */
export function clearError(container) {
  if (!container) return;
  const errorElement = container.querySelector('.error-container');
  if (errorElement) {
    errorElement.remove();
  }
}

