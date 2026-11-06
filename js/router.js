/**
 * Client-side Hash Router
 */
export class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this._onHashChange = this._handleRoute.bind(this);
  }

  /**
   * Register a route pattern and handler
   * e.g. router.on('/', handler) or router.on('/destination/:id', handler)
   * @param {string} path
   * @param {Function} handler
   */
  on(path, handler) {
    // Convert path pattern to regex (e.g. /destination/:id -> /destination/([^/]+))
    const paramNames = [];
    const regexPath = path.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return '([^/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);

    this.routes.push({
      path,
      regex,
      paramNames,
      handler
    });

    return this;
  }

  /**
   * Initialize router and bind hashchange listener
   */
  init() {
    window.addEventListener('hashchange', this._onHashChange);
    // Initial load
    this._handleRoute();
  }

  /**
   * Programmatic navigation
   * @param {string} path
   */
  navigate(path) {
    let target = path;
    if (!target.startsWith('/')) {
      target = '/' + target;
    }
    if (window.location.hash !== `#${target}`) {
      window.location.hash = `#${target}`;
    } else {
      // Force trigger if same hash
      this._handleRoute();
    }
  }

  /**
   * Get current route path and parsed parameters
   * @returns {{ path: string, params: Object }}
   */
  getCurrentRoute() {
    let hash = window.location.hash.slice(1); // remove '#'
    if (!hash || hash === '') {
      hash = '/';
    }
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }

    for (const route of this.routes) {
      const match = hash.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });
        return { path: hash, pattern: route.path, params };
      }
    }

    return { path: hash, pattern: null, params: {} };
  }

  /**
   * Handle hash change event
   */
  _handleRoute() {
    const routeInfo = this.getCurrentRoute();
    this.currentRoute = routeInfo.path;

    for (const route of this.routes) {
      const match = routeInfo.path.match(route.regex);
      if (match) {
        route.handler(routeInfo.params);
        return;
      }
    }

    // Default fallback to root if route not recognized
    if (this.routes.length > 0) {
      console.warn(`Route tidak ditemukan: ${routeInfo.path}, mengalihkan ke /`);
      this.navigate('/');
    }
  }

  /**
   * Destroy router listeners
   */
  destroy() {
    window.removeEventListener('hashchange', this._onHashChange);
  }
}

