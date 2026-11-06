/**
 * API Service for Tourism Destination Website
 */
export class ApiService {
  constructor(baseURL) {
    if (baseURL) {
      this.baseURL = baseURL.replace(/\/+$/, '');
    } else {
      // Auto-detect base URL
      const isCurrentPort3000 = window.location.port === '3000';
      this.baseURL = isCurrentPort3000 ? '/api' : 'http://localhost:3000/api';
    }
    this.timeoutMs = 8000;
  }

  /**
   * Internal request helper with timeout and error translation
   * @param {string} endpoint
   * @returns {Promise<any>}
   */
  async _fetch(endpoint) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error('Format data dari server tidak valid.');
      }

      if (!response.ok) {
        if (response.status === 404) {
          const errMsg = data?.error || 'Destinasi tidak ditemukan.';
          const error = new Error(errMsg);
          error.status = 404;
          throw error;
        }
        if (response.status >= 500) {
          const error = new Error('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
          error.status = response.status;
          throw error;
        }
        const error = new Error(data?.error || `Permintaan gagal dengan status ${response.status}`);
        error.status = response.status;
        throw error;
      }

      return data.data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        const timeoutError = new Error('Koneksi waktu habis (timeout). Server tidak merespon.');
        timeoutError.status = 408;
        throw timeoutError;
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = new Error('Tidak dapat terhubung ke server backend. Pastikan server sudah dijalankan.');
        networkError.status = 0;
        throw networkError;
      }

      throw error;
    }
  }

  /**
   * Fetch all destinations
   * @returns {Promise<Array>}
   */
  async getAllDestinations() {
    return await this._fetch('/destinations');
  }

  /**
   * Fetch a single destination by its ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getDestinationById(id) {
    if (!id) {
      const err = new Error('ID destinasi tidak valid.');
      err.status = 400;
      throw err;
    }
    return await this._fetch(`/destinations/${encodeURIComponent(id)}`);
  }
}

