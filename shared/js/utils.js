// Shared JavaScript utilities for AI Edge Gallery Skills

// DOM utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Local storage helpers
const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Error writing to localStorage:', e);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Error removing from localStorage:', e);
    }
  }
};

// API helpers
const api = {
  fetch: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  },
  
  get: (url, options = {}) => api.fetch(url, { ...options, method: 'GET' }),
  post: (url, data, options = {}) => api.fetch(url, { ...options, method: 'POST', body: JSON.stringify(data) })
};

// Toast notifications
const toast = {
  show: (message, type = 'info', duration = 3000) => {
    const toastEl = document.createElement('div');
    toastEl.className = `toast ${type}`;
    toastEl.textContent = message;
    
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
      toastEl.remove();
    }, duration);
  },
  
  success: (message, duration) => toast.show(message, 'success', duration),
  error: (message, duration) => toast.show(message, 'error', duration)
};

// Loading states
const loading = {
  show: (element) => {
    if (typeof element === 'string') element = $(element);
    if (element) {
      element.innerHTML = '<div class="spinner"></div>';
      element.disabled = true;
    }
  },
  
  hide: (element, originalContent = '') => {
    if (typeof element === 'string') element = $(element);
    if (element) {
      element.innerHTML = originalContent;
      element.disabled = false;
    }
  }
};

// Copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Copied to clipboard!');
      return true;
    } catch (fallbackError) {
      toast.error('Failed to copy to clipboard');
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format helpers
const format = {
  bytes: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  date: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
};

// Event delegation helper
const on = (eventType, selector, handler) => {
  document.addEventListener(eventType, (event) => {
    if (event.target.matches(selector)) {
      handler(event);
    }
  });
};

// Mobile detection
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Export utilities
window.GalleryUtils = {
  $,
  $$,
  storage,
  api,
  toast,
  loading,
  copyToClipboard,
  debounce,
  format,
  on,
  isMobile
};