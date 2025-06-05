/**
 * High-Quality Video Thumbnail Generator
 * Creates optimized thumbnails from video sources
 */

/**
 * Generate a thumbnail from a video URL or element
 *
 * @param {Object} options - Configuration options
 * @param {string|HTMLVideoElement} options.video - Video URL or video element
 * @param {number} options.quality - JPEG quality (0-1), default: 0.9
 * @param {number} options.width - Desired width, default: original video width
 * @param {number} options.height - Desired height, default: original video height
 * @param {number} options.seekTime - Time in seconds to capture frame, default: 1
 * @param {string} options.format - Image format ('jpeg', 'png', 'webp'), default: 'jpeg'
 * @param {boolean} options.cors - Enable CORS, default: true
 * @param {Function} options.onSuccess - Success callback with dataURL
 * @param {Function} options.onError - Error callback
 * @param {boolean} options.useCache - Whether to use caching, default: true
 * @param {number} options.cacheExpiration - Cache expiration in hours, default: 24
 * @param {string} options.fallbackImage - URL to a fallback image if thumbnail generation fails
 * @returns {Promise} - Promise resolving to dataURL
 */
export function generateVideoThumbnail(options) {
  return new Promise((resolve, reject) => {
    // Default options
    const settings = {
      video: null,
      quality: 0.9,
      width: null,
      height: null,
      seekTime: 1,
      format: 'jpeg',
      cors: true,
      onSuccess: null,
      onError: null,
      useCache: true,
      cacheExpiration: 24, // hours
      fallbackImage: null, // New setting for fallback image
    };

    // Merge options
    Object.assign(settings, options);

    // Extract video source from video element or use URL directly
    let videoSrc = '';
    let videoElement = null;

    if (settings.video instanceof HTMLVideoElement) {
      videoElement = settings.video;
      videoSrc = videoElement.querySelector('source')
        ? videoElement.querySelector('source').src
        : videoElement.src;
    } else if (typeof settings.video === 'string') {
      videoSrc = settings.video;
    } else {
      const error = new Error('Invalid video source');
      if (settings.onError) settings.onError(error);
      return reject(error);
    }

    // Generate cache key from video source
    const cacheKey = `videoThumbnail_${hashString(videoSrc)}`;

    // Check cache first if enabled
    if (settings.useCache) {
      try {
        const cachedData = getCachedThumbnail(cacheKey, settings.cacheExpiration);
        if (cachedData) {
          console.log('Using cached thumbnail for:', videoSrc);

          if (settings.onSuccess) settings.onSuccess(cachedData);
          return resolve(cachedData);
        }
      } catch (e) {
        console.warn('Cache retrieval error:', e);
        // Continue with thumbnail generation if cache fails
      }
    }

    // Create video element if not provided
    if (!videoElement) {
      videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.src = videoSrc;

      if (settings.cors) {
        videoElement.crossOrigin = 'anonymous';
      }
    }

    // Set up event listeners for video loading
    const loadErrorHandler = (e) => {
      let errorMessage = e.message || 'Unknown error';

      // Check for common CORS-related errors
      if (
        errorMessage.includes('Tainted canvases may not be exported') ||
        e.name === 'SecurityError' ||
        e.name === 'InvalidStateError'
      ) {
        errorMessage = `CORS error: The video might be from a different origin that doesn't allow cross-origin access. Make sure:
        1. The video element has crossorigin="anonymous" attribute
        2. The server provides proper CORS headers (Access-Control-Allow-Origin)
        Original error: ${errorMessage}`;

        // Try to use fallback image if provided
        if (settings.fallbackImage) {
          console.warn(`Using fallback image due to CORS error for video: ${videoSrc}`);

          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = settings.width || img.width;
            canvas.height = settings.height || img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            try {
              const dataURL = canvas.toDataURL(`image/${settings.format}`, settings.quality);
              cleanup();
              if (settings.onSuccess) settings.onSuccess(dataURL);
              resolve(dataURL);
              return;
            } catch (err) {
              console.error('Failed to generate fallback thumbnail:', err);
              // Continue with the normal error flow
            }
          };

          img.onerror = () => {
            console.error('Failed to load fallback image:', settings.fallbackImage);
            // Continue with the normal error flow
          };

          img.src = settings.fallbackImage;
          return;
        }
      }

      const error = new Error(`Video loading failed: ${errorMessage}`);
      cleanup();
      if (settings.onError) settings.onError(error);
      reject(error);
    };

    const loadHandler = () => {
      try {
        // Set video to seekTime
        videoElement.currentTime = settings.seekTime;
      } catch (e) {
        loadErrorHandler(e);
      }
    };

    const seekedHandler = () => {
      try {
        // Get video dimensions
        const videoWidth = settings.width || videoElement.videoWidth;
        const videoHeight = settings.height || videoElement.videoHeight;

        // Create canvas with the right dimensions
        const canvas = document.createElement('canvas');
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Draw the video frame to the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

        // Generate data URL
        const dataURL = canvas.toDataURL(`image/${settings.format}`, settings.quality);

        // Store in cache if enabled
        if (settings.useCache) {
          try {
            cacheThumbnail(cacheKey, dataURL);
          } catch (e) {
            console.warn('Cache storage error:', e);
            // Continue even if caching fails
          }
        }

        // Return the data URL
        cleanup();
        if (settings.onSuccess) settings.onSuccess(dataURL);
        resolve(dataURL);
      } catch (e) {
        loadErrorHandler(e);
      }
    };

    // Clean up event listeners
    const cleanup = () => {
      videoElement.removeEventListener('loadeddata', loadHandler);
      videoElement.removeEventListener('seeked', seekedHandler);
      videoElement.removeEventListener('error', loadErrorHandler);

      // Stop the video and release resources
      try {
        videoElement.pause();
        if (!options.video) {
          // Only if we created this video element
          videoElement.src = '';
          videoElement.load();
        }
      } catch (e) {
        console.warn('Cleanup error:', e);
      }
    };

    // Set up event handlers
    videoElement.addEventListener('loadeddata', loadHandler);
    videoElement.addEventListener('seeked', seekedHandler);
    videoElement.addEventListener('error', loadErrorHandler);

    // Start loading the video
    try {
      videoElement.load();
    } catch (e) {
      loadErrorHandler(e);
    }
  });
}

/**
 * Initialize video thumbnails for multiple videos
 * @param {string|NodeList|HTMLElement} selector - CSS selector, NodeList, or element
 * @param {Object} options - Options for thumbnail generation
 */
export function initVideoThumbnails(selector, options = {}) {
  let elements;

  // Process selector
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector + ' video');
  } else if (selector instanceof NodeList) {
    elements = selector;
  } else if (selector instanceof HTMLElement) {
    elements = [selector];
  } else {
    console.error('Invalid selector for initVideoThumbnails');
    return;
  }

  // Process each video element
  elements.forEach((videoElement) => {
    if (!(videoElement instanceof HTMLVideoElement)) {
      if (videoElement.querySelector('video')) {
        videoElement = videoElement.querySelector('video');
      } else {
        return;
      }
    }

    // Get video container
    const container =
      videoElement.closest('.video-card-container, .video-thumbnail-container') ||
      videoElement.parentElement;

    if (!container) return;

    // Skip if video already has a poster
    if (
      videoElement.hasAttribute('poster') &&
      videoElement.getAttribute('poster').startsWith('data:')
    ) {
      container.classList.remove('thumbnail-loading');
      container.classList.add('thumbnail-ready');
      return;
    }

    // Add loading class to container
    container.classList.add('thumbnail-loading');

    // Get video source
    const videoSrc = videoElement.querySelector('source')?.src || videoElement.src;
    if (!videoSrc) {
      container.classList.remove('thumbnail-loading');
      container.classList.add('thumbnail-error');
      return;
    }

    // Generate thumbnail
    const thumbnailOptions = {
      video: videoElement,
      quality: options.quality || 0.95,
      seekTime: options.seekTime || 1.5,
      format: options.format || 'jpeg',
      useCache: options.useCache !== false, // Default to true
      cacheExpiration: options.cacheExpiration || 24, // 24 hours default
      onSuccess: (dataURL) => {
        videoElement.setAttribute('poster', dataURL);
        container.classList.remove('thumbnail-loading');
        container.classList.add('thumbnail-ready', 'thumbnail-generated');
        console.log('✓ Thumbnail generated for:', videoSrc);
      },
      onError: (error) => {
        container.classList.remove('thumbnail-loading');
        container.classList.add('thumbnail-error');
        console.error('✗ Thumbnail error:', error);
      },
    };

    generateVideoThumbnail(thumbnailOptions);
  });
}

/**
 * Store thumbnail in localStorage with timestamp
 * @param {string} key - Cache key
 * @param {string} dataURL - Thumbnail data URL
 */
function cacheThumbnail(key, dataURL) {
  try {
    const cacheData = {
      timestamp: Date.now(),
      dataURL: dataURL,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
    return true;
  } catch (e) {
    console.warn('Error storing thumbnail in cache:', e);

    // If localStorage is full, try to clear old items
    if (e.name === 'QuotaExceededError') {
      cleanupOldCache();

      // Try again
      try {
        const cacheData = {
          timestamp: Date.now(),
          dataURL: dataURL,
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
        return true;
      } catch (retryError) {
        console.error('Failed to store thumbnail after cleanup:', retryError);
      }
    }
    return false;
  }
}

/**
 * Get cached thumbnail if valid
 * @param {string} key - Cache key
 * @param {number} expirationHours - Cache expiration in hours
 * @returns {string|null} - Thumbnail data URL or null if not found/expired
 */
function getCachedThumbnail(key, expirationHours = 24) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;

    const cacheData = JSON.parse(data);
    const expirationTime = expirationHours * 60 * 60 * 1000; // Convert hours to ms

    // Check if cache is expired
    if (Date.now() - cacheData.timestamp > expirationTime) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheData.dataURL;
  } catch (e) {
    console.warn('Error retrieving cached thumbnail:', e);
    return null;
  }
}

/**
 * Remove old cache entries to free up space
 */
function cleanupOldCache() {
  try {
    // Find and remove oldest video thumbnails
    const thumbnailKeys = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('videoThumbnail_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          thumbnailKeys.push({
            key,
            timestamp: data.timestamp || 0,
          });
        } catch (e) {
          // If we can't parse it, add it for removal anyway
          thumbnailKeys.push({
            key,
            timestamp: 0,
          });
        }
      }
    }

    // Sort by timestamp (oldest first)
    thumbnailKeys.sort((a, b) => a.timestamp - b.timestamp);

    // Remove the oldest 50% of items
    const removeCount = Math.ceil(thumbnailKeys.length / 2);
    for (let i = 0; i < removeCount && i < thumbnailKeys.length; i++) {
      localStorage.removeItem(thumbnailKeys[i].key);
    }

    console.log(`Cache cleanup: removed ${removeCount} old thumbnails`);
    return true;
  } catch (e) {
    console.error('Error during cache cleanup:', e);
    return false;
  }
}

/**
 * Create a simple hash from a string (for cache keys)
 * @param {string} str - String to hash
 * @returns {string} - Hashed string
 */
function hashString(str) {
  let hash = 0;
  if (str.length === 0) return hash.toString();

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36);
}

// Export default functions
export default {
  generateVideoThumbnail,
  initVideoThumbnails,
};
