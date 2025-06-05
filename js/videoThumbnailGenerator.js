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
 * @returns {Promise<string>} - Promise resolving to dataURL
 */
export function generateVideoThumbnail(options) {
  // Default options
  const settings = {
    video: null,
    quality: 0.9,
    seekTime: 1,
    format: 'jpeg',
    cors: true,
    width: null,
    height: null,
    onSuccess: null,
    onError: null,
    ...options
  };

  return new Promise((resolve, reject) => {
    try {
      // Create video element if URL was provided
      const videoEl = typeof settings.video === 'string'
        ? createVideoElement(settings.video, settings.cors)
        : settings.video;

      if (!videoEl) {
        const error = new Error('Invalid video source');
        if (settings.onError) settings.onError(error);
        reject(error);
        return;
      }

      // If video is already loaded, generate thumbnail immediately
      if (videoEl.readyState >= 3) {
        createThumbnail(videoEl, settings, resolve, reject);
        return;
      }

      // Setup event listeners for video loading
      const loadHandler = () => {
        // Seek to specified time for better thumbnail
        videoEl.currentTime = settings.seekTime;
      };

      const seekedHandler = () => {
        createThumbnail(videoEl, settings, resolve, reject);

        // Clean up event listeners
        videoEl.removeEventListener('loadeddata', loadHandler);
        videoEl.removeEventListener('seeked', seekedHandler);

        // Clean up temp video element if we created one
        if (typeof settings.video === 'string') {
          document.body.removeChild(videoEl);
        }
      };

      const errorHandler = (e) => {
        console.error('Error loading video:', e);

        // Clean up event listeners
        videoEl.removeEventListener('loadeddata', loadHandler);
        videoEl.removeEventListener('seeked', seekedHandler);
        videoEl.removeEventListener('error', errorHandler);

        // Clean up temp video element if we created one
        if (typeof settings.video === 'string') {
          document.body.removeChild(videoEl);
        }

        const error = new Error('Failed to load video');
        if (settings.onError) settings.onError(error);
        reject(error);
      };

      // Add event listeners
      videoEl.addEventListener('loadeddata', loadHandler);
      videoEl.addEventListener('seeked', seekedHandler);
      videoEl.addEventListener('error', errorHandler);

      // Load the video if it's not loaded yet
      if (videoEl.readyState === 0) {
        videoEl.load();
      }
    } catch (error) {
      console.error('Thumbnail generation error:', error);
      if (settings.onError) settings.onError(error);
      reject(error);
    }
  });
}

/**
 * Creates a temporary hidden video element for thumbnail generation
 */
function createVideoElement(videoSrc, cors = true) {
  const videoEl = document.createElement('video');

  // Configure video element
  videoEl.style.position = 'absolute';
  videoEl.style.opacity = '0';
  videoEl.style.pointerEvents = 'none';
  videoEl.style.zIndex = '-1';
  videoEl.style.width = '1px';
  videoEl.style.height = '1px';
  videoEl.setAttribute('muted', '');
  videoEl.setAttribute('playsinline', '');

  // Enable cross-origin support
  if (cors) {
    videoEl.setAttribute('crossorigin', 'anonymous');
  }

  // Set source
  videoEl.src = videoSrc;

  // Append to body temporarily (required for some browsers)
  document.body.appendChild(videoEl);

  return videoEl;
}

/**
 * Creates the actual thumbnail from a video frame
 */
function createThumbnail(videoEl, settings, resolve, reject) {
  try {
    // Get dimensions (use original video size if not specified)
    const width = settings.width || videoEl.videoWidth;
    const height = settings.height || videoEl.videoHeight;

    // Create canvas and context
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    // Apply high-quality settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw video frame to canvas
    ctx.drawImage(videoEl, 0, 0, width, height);

    // Convert to data URL
    const mimeType = `image/${settings.format}`;
    const dataURL = canvas.toDataURL(mimeType, settings.quality);

    // Execute success callback if provided
    if (settings.onSuccess) {
      settings.onSuccess(dataURL);
    }

    // Resolve promise
    resolve(dataURL);
  } catch (error) {
    console.error('Error creating thumbnail:', error);

    // Execute error callback if provided
    if (settings.onError) {
      settings.onError(error);
    }

    reject(error);
  }
}

/**
 * Initialize thumbnail generation for all videos in a container
 *
 * @param {string|Element} container - Container selector or element
 * @param {Object} options - Thumbnail generation options
 */
export function initVideoThumbnails(container, options = {}) {
  // Get container element
  const containerElement = typeof container === 'string'
    ? document.querySelector(container)
    : container;

  if (!containerElement) {
    console.warn('Container not found:', container);
    return;
  }

  // Get all video elements in the container
  const videos = containerElement.querySelectorAll('video:not([data-thumbnail-ignore])');

  // Process each video
  videos.forEach((video, index) => {
    // Skip videos that already have a poster
    if (video.hasAttribute('poster') && video.getAttribute('poster') !== '') {
      return;
    }

    // Get video source
    const videoSrc = video.querySelector('source')?.src || video.src;
    if (!videoSrc) {
      console.warn(`Video ${index} has no source:`, video);
      return;
    }

    // Generate and apply thumbnail
    generateVideoThumbnail({
      video: videoSrc,
      ...options,
      onSuccess: (dataUrl) => {
        // Set as poster
        video.setAttribute('poster', dataUrl);
        video.classList.add('thumbnail-generated');

        // Call custom success handler if provided
        if (options.onSuccess) {
          options.onSuccess(dataUrl, video);
        }
      },
      onError: (error) => {
        console.warn(`Failed to generate thumbnail for video ${index}:`, error);

        // Call custom error handler if provided
        if (options.onError) {
          options.onError(error, video);
        }
      }
    });
  });
}

// Export default functions
export default {
  generateVideoThumbnail,
  initVideoThumbnails
};
