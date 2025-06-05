// Import the video thumbnail generator
import { initVideoThumbnails, generateVideoThumbnail } from './videoThumbnailGenerator.js';

/**
 * Initialize high-quality video thumbnails
 */
export function initHighQualityVideoThumbnails() {
  console.log('Initializing high-quality video thumbnails...');

  // Default fallback image if CORS fails - use existing thumbnail
  const defaultFallbackImage = 'images/thumbnails/DJI_20250511155856_0068_D.jpg';

  // First, ensure all videos have crossorigin attribute
  document.querySelectorAll('video').forEach(video => {
    if (!video.hasAttribute('crossorigin')) {
      video.setAttribute('crossorigin', 'anonymous');
    }
  });

  // Apply thumbnails to all videos in the page
  initVideoThumbnails('.page-content', {
    quality: 0.95, // High quality (0-1)
    seekTime: 1.5, // Seek to 1.5 seconds to get a good frame
    format: 'jpeg', // Use JPEG format for best compatibility
    useCache: true, // Enable localStorage caching
    cors: true, // Ensure CORS is explicitly enabled
    cacheExpiration: 24, // Cache expires after 24 hours
    fallbackImage: defaultFallbackImage, // Use default fallback if CORS fails
  });

  // Optional: Add custom handling for specific video containers
  handleSpecialVideoContainers();
}

/**
 * Handle special video containers that need custom thumbnail treatment
 */
function handleSpecialVideoContainers() {
  // Default fallback image if CORS fails - use existing thumbnail
  const defaultFallbackImage = 'images/thumbnails/DJI_20250511155856_0068_D.jpg';

  // Generate thumbnails for video cards
  const videoCards = document.querySelectorAll('.video-card-container video');
  videoCards.forEach(video => {
    // Ensure crossOrigin attribute is set for all videos
    if (!video.hasAttribute('crossorigin')) {
      video.setAttribute('crossorigin', 'anonymous');
    }

    const container = video.closest('.video-card-container');
    if (container && !video.hasAttribute('poster')) {
      const thumbnailOptions = {
        video: video,
        quality: 0.9,
        seekTime: 1.5,
        useCache: true,
        cors: true,
        fallbackImage: defaultFallbackImage,
        cacheExpiration: 48, // Cache for longer (48 hours)
        onSuccess: dataURL => {
          video.setAttribute('poster', dataURL);
          container.classList.remove('thumbnail-loading');
          container.classList.add('thumbnail-ready');
        },
      };

      // Add loading indicator
      container.classList.add('thumbnail-loading');

      // Generate thumbnail
      generateVideoThumbnail(thumbnailOptions);
    }
  });

  // Handle thumbnail videos in list view
  const thumbnailVideos = document.querySelectorAll('.thumbnail-video');
  thumbnailVideos.forEach((video, index) => {
    // Ensure crossOrigin attribute is set
    if (!video.hasAttribute('crossorigin')) {
      video.setAttribute('crossorigin', 'anonymous');
    }

    if (video.hasAttribute('poster') && video.getAttribute('poster') !== '') {
      return;
    }

    const videoSrc = video.querySelector('source')?.src || video.src;
    if (!videoSrc) return;

    generateVideoThumbnail({
      video: videoSrc,
      quality: 0.9,
      seekTime: 1,
      cors: true,
      fallbackImage: defaultFallbackImage,
      onSuccess: dataUrl => {
        video.setAttribute('poster', dataUrl);
        console.log(`✅ Generated thumbnail for list video ${index + 1}`);
      },
    });
  });
}

// Auto-initialize when imported (if the DOM is ready)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // Run on next tick to ensure DOM is fully loaded
  setTimeout(initHighQualityVideoThumbnails, 0);
} else {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', initHighQualityVideoThumbnails);
}

// Export function for direct usage
export default initHighQualityVideoThumbnails;
