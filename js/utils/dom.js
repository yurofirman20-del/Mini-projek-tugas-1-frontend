/**
 * DOM utility helper functions
 */

/**
 * Creates an element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - HTML attributes or event handlers (e.g. { class: 'card', onClick: fn })
 * @param  {...(Node|string)} children - Child elements or text nodes
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes || {})) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key === 'className' || key === 'class') {
      element.className = value;
    } else if (key === 'dataset' && typeof value === 'object') {
      for (const [dataKey, dataVal] of Object.entries(value)) {
        element.dataset[dataKey] = dataVal;
      }
    } else if (value !== null && value !== undefined && value !== false) {
      element.setAttribute(key, value === true ? '' : value);
    }
  }

  appendChildren(element, children);
  return element;
}

/**
 * Appends children to a parent element safely
 * @param {HTMLElement} parent
 * @param {Array<Node|string>} children
 */
export function appendChildren(parent, children) {
  const flatChildren = Array.isArray(children) ? children.flat(Infinity) : [children];
  for (const child of flatChildren) {
    if (child === null || child === undefined) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      parent.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      parent.appendChild(child);
    }
  }
}

/**
 * Clears all child nodes from a container
 * @param {HTMLElement} container
 */
export function clearContainer(container) {
  if (!container) return;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Formats a number to Indonesian Rupiah currency format
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  if (amount === 0) return 'Gratis';
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Basic sanitization to prevent XSS in text injection
 * @param {string} str
 * @returns {string}
 */
export function sanitize(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

