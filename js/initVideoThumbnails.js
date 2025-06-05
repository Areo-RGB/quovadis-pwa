// Import the video thumbnail generator
import { initVideoThumbnails, generateVideoThumbnail } from './videoThumbnailGenerator.js';

/**
 * Initialize high-quality video thumbnails
 */
export function initHighQualityVideoThumbnails() {
  console.log('Initializing high-quality video thumbnails...');

  // Apply thumbnails to all videos in the page
  initVideoThumbnails('.page-content', {
    quality: 0.95, // High quality (0-1)
    seekTime: 1.5, // Seek to 1.5 seconds to get a good frame
    format: 'jpeg' // Use JPEG format for best compatibility
  });

  // Optional: Add custom handling for specific video containers
  handleSpecialVideoContainers();
}

/**
 * Handle special video containers that need custom thumbnail treatment
 */
function handleSpecialVideoContainers() {
  // Generate thumbnails for video cards
  const videoCards = document.querySelectorAll('.video-card-container video');

  videoCards.forEach((videoElement, index) => {
    // Skip if a poster is already set
    if (videoElement.hasAttribute('poster') && videoElement.getAttribute('poster') !== '') {
      return;
    }

    // Get video source
    const videoSrc = videoElement.querySelector('source')?.src || videoElement.src;
    if (!videoSrc) return;

    // Add loading indicator
    const parentCard = videoElement.closest('.video-card-container');
    if (parentCard) {
      parentCard.classList.add('thumbnail-loading');
    }

    // Generate high-quality thumbnail
    generateVideoThumbnail({
      video: videoSrc,
      quality: 0.95, // Very high quality
      seekTime: 1.5, // Good frame usually at 1.5 seconds
      format: 'jpeg',
      onSuccess: (dataUrl) => {
        // Set poster attribute
        videoElement.setAttribute('poster', dataUrl);

        // Mark as loaded
        videoElement.classList.add('thumbnail-generated');
        if (parentCard) {
          parentCard.classList.remove('thumbnail-loading');
          parentCard.classList.add('thumbnail-ready');
        }

        console.log(`✅ Generated high-quality thumbnail for video ${index + 1}`);
      },
      onError: (error) => {
        console.error(`❌ Failed to generate thumbnail for video ${index + 1}:`, error);
        if (parentCard) {
          parentCard.classList.remove('thumbnail-loading');
          parentCard.classList.add('thumbnail-error');
        }
      }
    });
  });

  // Handle thumbnail videos in list view
  const thumbnailVideos = document.querySelectorAll('.thumbnail-video');
  thumbnailVideos.forEach((video, index) => {
    if (video.hasAttribute('poster') && video.getAttribute('poster') !== '') {
      return;
    }

    const videoSrc = video.querySelector('source')?.src || video.src;
    if (!videoSrc) return;

    generateVideoThumbnail({
      video: videoSrc,
      quality: 0.9,
      seekTime: 1,
      onSuccess: (dataUrl) => {
        video.setAttribute('poster', dataUrl);
        console.log(`✅ Generated thumbnail for list video ${index + 1}`);
      }
    });
  });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initHighQualityVideoThumbnails();
});

// Export function for direct usage
export default initHighQualityVideoThumbnails;
