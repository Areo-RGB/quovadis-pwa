export function initHomePageHeroAnimations() {
  console.log('Initializing Homepage Hero Animations');

  // Add initial delay to account for page loading
  const initialDelay = 800; // 800ms delay before starting animations

  // Get the first picture/hero image element - Updated to target background slides
  const firstPicture = document.querySelector(
    '.bg-slide.active, #bg-slideshow .bg-slide:first-child'
  );

  // Create and add reveal animation styles
  if (firstPicture) {
    // Create scanline element
    const scanline = document.createElement('div');
    scanline.classList.add('scanline');
    scanline.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
      z-index: 10;
      opacity: 0;
      transform: translateY(-2px);
    `;

    // Create reveal mask container
    const revealContainer = document.createElement('div');
    revealContainer.classList.add('image-reveal-container');
    revealContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      z-index: 5;
      pointer-events: none;
    `;

    // Insert the reveal container into the bg-slideshow container
    const bgSlideshow = document.querySelector('#bg-slideshow');
    if (bgSlideshow) {
      bgSlideshow.appendChild(revealContainer);
      revealContainer.appendChild(scanline);
    }

    // Set initial state for reveal animation - create a reveal mask
    const revealMask = document.createElement('div');
    revealMask.classList.add('reveal-mask');
    revealMask.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #1b1d21;
      transform: translateY(0%);
      transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 8;
    `;
    revealContainer.appendChild(revealMask);

    // Add CSS animation keyframes to document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scanlineMove {
        0% {
          transform: translateY(-2px);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Get text elements for initial fade-in
  const charlierText = document.querySelector('.card-bottom h1.font-24');
  const finleyHeading = document.querySelector('.finley-animated-heading');
  const clubText = document.querySelector('.fade-in-club-name'); // Updated selector

  // Set initial opacity for Charlier text (clubText is already 0 via inline style)
  if (charlierText) charlierText.style.opacity = '0';

  // Start image reveal animation immediately after initial delay
  setTimeout(() => {
    if (firstPicture) {
      // Start image reveal by sliding the mask up
      const revealMask = document.querySelector('.reveal-mask');
      if (revealMask) {
        revealMask.style.transform = 'translateY(-100%)';
      }

      // Start scanline animation
      const scanline = document.querySelector('.scanline');
      if (scanline) {
        scanline.style.animation = 'scanlineMove 1.5s ease-out';

        // Remove scanline after animation completes
        setTimeout(() => {
          if (scanline.parentNode) {
            scanline.parentNode.removeChild(scanline);
          }
        }, 1500);
      }

      // Remove reveal mask after animation completes
      setTimeout(() => {
        if (revealMask && revealMask.parentNode) {
          revealMask.parentNode.removeChild(revealMask);
        }
      }, 1500);
    }
  }, initialDelay);

  // Fade in Charlier text slightly after image starts revealing
  setTimeout(() => {
    if (charlierText) {
      charlierText.style.transition = 'opacity 0.8s ease-in-out';
      charlierText.style.opacity = '1';
    }
  }, initialDelay + 200);

  // Then animate Finley letters with terminal effect
  if (finleyHeading) {
    const finleyLetters = finleyHeading.querySelectorAll('span');
    let finleyAnimationEndTime = initialDelay + 800; // Base time for Finley animation start

    // Create blinking cursor
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = `
      position: absolute;
      color: #ffffff;
      animation: blinkCursor 1s infinite;
      left: 100%;
      top: 0;
      margin-left: 0.2em;
      z-index: 10;
      pointer-events: none;
    `;

    // Make finley heading relatively positioned for cursor positioning
    finleyHeading.style.position = 'relative';
    finleyHeading.appendChild(cursor);

    // Add blinking cursor keyframes
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      @keyframes blinkCursor {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(cursorStyle);

    // Hide all letters initially
    finleyLetters.forEach((span, index) => {
      span.style.opacity = '0';
      span.style.transform = 'translateX(20px)';
      span.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    });

    // Animate letters from left to right (F, I, N, L, E, Y)
    finleyLetters.forEach((span, index) => {
      const letterDelay = index * 300; // Longer delay between letters
      setTimeout(
        () => {
          span.style.opacity = '1';
          span.style.transform = 'translateX(0)';

          // Apply special styling to F during animation
          if (index === 0) {
            span.style.setProperty('font-size', '1.3em', 'important');
            span.style.setProperty('color', '#ff4444', 'important');
            span.style.setProperty('font-weight', '900', 'important');
          }
        },
        initialDelay + 800 + letterDelay
      );

      // Calculate when the last letter's animation will end
      finleyAnimationEndTime = Math.max(
        finleyAnimationEndTime,
        initialDelay + 800 + letterDelay + 300
      );
    });

    // Remove cursor after all letters are typed
    setTimeout(() => {
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    }, finleyAnimationEndTime + 500);

    // Animate Club Name after Finley animation completes
    const clubNameAnimationStartTime = finleyAnimationEndTime + 100; // Start 100ms after Finley
    setTimeout(() => {
      if (clubText) {
        clubText.classList.add('animate'); // Add .animate class to trigger CSS animation
      }
    }, clubNameAnimationStartTime);

    const clubNameAnimationDuration = 800; // Duration of club name fade-in (from CSS)

    const initialStatsData = [
      { name: '10m Sprint', value: '2.00s', label: 'AUSGEZEICHNET' },
      { name: '20m Sprint', value: '3.59s', label: 'SEHR GUT' },
      { name: 'Gewandtheit', value: '7.81s', label: 'AUSGEZEICHNET' },
      { name: 'Dribbling', value: '10.27s', label: 'AUSGEZEICHNET' },
      { name: 'Balljonglieren', value: '0.00', label: 'UNTERDURCHSCHNITTLICH' },
      { name: 'Ballkontrolle', value: '10.82s', label: 'DURCHSCHNITTLICH' },
    ];

    const gesamtleistungData = {
      name: 'Gesamtleistung',
      value: '101.80',
      label: 'SEHR GUT',
    };

    const elementsToRender = [];
    initialStatsData.forEach(stat => {
      elementsToRender.push({ type: 'stat', data: stat });
      // Add divider after "Ballkontrolle" or before "Gesamtleistung"
      if (stat.name === 'Ballkontrolle') {
        elementsToRender.push({ type: 'divider' });
      }
    });
    elementsToRender.push({
      type: 'stat',
      data: gesamtleistungData,
      isSummary: true,
    });

    const statsContainer = document.querySelector('.statistics-container');

    if (statsContainer) {
      // Stats animation should start after club name animation is complete + a small buffer
      const statsActualStartTime = clubNameAnimationStartTime + clubNameAnimationDuration + 200; // 200ms buffer

      setTimeout(() => {
        elementsToRender.forEach((element, index) => {
          const rowBaseDelay = index * 350; // Stagger animation for each element

          if (element.type === 'stat') {
            const stat = element.data;
            const item = document.createElement('div');
            item.classList.add('statistic-item');
            if (element.isSummary) {
              item.classList.add('statistic-item-summary');
            }

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('stat-exercise-name');
            nameSpan.textContent = stat.name;

            const ratingContainer = document.createElement('span');
            ratingContainer.classList.add('stat-rating-container');
            const ratingText = document.createElement('span');
            ratingText.classList.add('stat-rating-text');
            ratingText.textContent = stat.label;

            // Apply label classes based on rating
            if (stat.label === 'AUSGEZEICHNET') ratingText.classList.add('label-ausgezeichnet');
            else if (stat.label === 'SEHR GUT') ratingText.classList.add('label-sehr-gut');
            else if (stat.label === 'DURCHSCHNITTLICH')
              ratingText.classList.add('label-durchschnittlich');
            else if (stat.label === 'UNTERDURCHSCHNITTLICH')
              ratingText.classList.add('label-unterdurchschnittlich');

            ratingContainer.appendChild(ratingText);

            const valueSpan = document.createElement('span');
            valueSpan.classList.add('stat-result');
            valueSpan.textContent = stat.value;

            item.appendChild(nameSpan);
            item.appendChild(ratingContainer);
            item.appendChild(valueSpan);
            statsContainer.appendChild(item);

            // Animation trigger
            setTimeout(() => {
              item.style.opacity = '1'; // Make item visible for animations
              nameSpan.classList.add('animate-slide-in-left');
              valueSpan.classList.add('animate-slide-in-right');

              const nameValueAnimationDuration = 600; // Duration of slide-in animations
              const ratingBuffer = 100; // Buffer before rating animation starts

              setTimeout(() => {
                ratingContainer.classList.add('animate-rating-drop-in');
              }, nameValueAnimationDuration + ratingBuffer);
            }, rowBaseDelay);
          } else if (element.type === 'divider') {
            const dividerElement = document.createElement('div');
            dividerElement.classList.add('divider', 'divider-margins', 'divider-prominent');
            dividerElement.style.opacity = '0'; // Start transparent for fade-in
            statsContainer.appendChild(dividerElement);

            setTimeout(() => {
              dividerElement.style.transition = 'opacity 0.5s ease-in-out 0.1s'; // 0.1s delay
              dividerElement.style.opacity = '1';
            }, rowBaseDelay);
          }
        });

        // Calculate when all animations should be complete
        const lastElementIndex = elementsToRender.length - 1;
        const lastElementDelay = lastElementIndex * 350;
        const animationCompletionTime = lastElementDelay + 1000; // Add buffer for last animation

        // Fade out statistics after 5 seconds
        setTimeout(() => {
          statsContainer.style.transition = 'opacity 1s ease-in-out';
          statsContainer.style.opacity = '0';

          // Get the text elements
          const charlierText = document.querySelector('.card-bottom h1.font-24');
          const finleyHeading = document.querySelector('.finley-animated-heading');
          // Club text already selected as clubText

          // Add animation to move text up and out - synchronized
          if (charlierText) {
            charlierText.style.transition = 'transform 1.2s ease-in-out, opacity 1s ease-in-out';
            charlierText.style.transform = 'translateY(-100px)';
            charlierText.style.opacity = '0';
            setTimeout(() => (charlierText.style.visibility = 'hidden'), 1200);
          }

          if (finleyHeading) {
            finleyHeading.style.transition = 'transform 1.2s ease-in-out, opacity 1s ease-in-out';
            finleyHeading.style.transform = 'translateY(-100px)';
            finleyHeading.style.opacity = '0';
            setTimeout(() => (finleyHeading.style.visibility = 'hidden'), 1200);
          }

          if (clubText) {
            clubText.style.transition = 'transform 1.2s ease-in-out, opacity 1s ease-in-out';
            clubText.style.transform = 'translateY(-100px)';
            clubText.style.opacity = '0'; // This will override the animation's opacity
            setTimeout(() => (clubText.style.visibility = 'hidden'), 1200);

            // Remove overlays after all animations complete
            setTimeout(() => {
              // Target both overlays specifically
              const overlay1 = document.querySelector(
                '.card-overlay.bg-gradient:not(.fa-rotate-180)'
              );
              const overlay2 = document.querySelector('.card-overlay.bg-gradient.fa-rotate-180');

              if (overlay1) {
                overlay1.style.transition = 'opacity 1s ease-out';
                overlay1.style.opacity = '0';
              }

              if (overlay2) {
                overlay2.style.transition = 'opacity 1s ease-out';
                overlay2.style.opacity = '0';
                overlay2.style.visibility = 'hidden'; // Force hide the rotated overlay
              }
            }, 2000);
          }
        }, animationCompletionTime + 5000); // 5 seconds after animations complete
      }, statsActualStartTime); // Use the adjusted start time
    } else {
      console.warn('HeroAnimations: Statistics container .statistics-container not found.');
    }
  } else {
    console.warn('HeroAnimations: Finley heading .finley-animated-heading not found.');
  }
}

// Initialize automatically when module is loaded
document.addEventListener('DOMContentLoaded', function () {
  initHomePageHeroAnimations();
});
