export function initHomePageHeroAnimations() {
  console.log('Initializing Homepage Hero Animations');

  // Add initial delay to account for page loading
  const initialDelay = 2500; // 2500ms delay before starting animations

  // Get the first picture/hero image element - Updated to target background slides
  const firstPicture = document.querySelector(
    '.bg-slide.active, #bg-slideshow .bg-slide:first-child'
  );



  // Get text elements for initial fade-in
  const logoContainer = document.querySelector('.logo-container');
  const finleyHeading = document.querySelector('.finley-animated-heading');
  const clubText = document.querySelector('.fade-in-club-name'); // Updated selector

  // Set initial opacity for logo (clubText is already 0 via inline style)
  if (logoContainer) logoContainer.style.opacity = '0';



          // Animate logo with clock sweep reveal after initial delay
  setTimeout(() => {
    if (logoContainer) {
      const logo = logoContainer.querySelector('.club-logo');
      if (logo) {
        // Create SVG with arc clipPath
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        `;

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.id = 'logoClipArc';

        const arcPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arcPath.id = 'logoArcPath';

        clipPath.appendChild(arcPath);
        defs.appendChild(clipPath);
        svg.appendChild(defs);
        document.body.appendChild(svg);

        // Arc animation variables (based on CodePen)
        const RAD = Math.PI / 180;
        const PI_2 = Math.PI / 2;
        const arc = {
          start: 0,
          end: 0,
          cx: 50,
          cy: 50,
          r: 60
        };

        // getPath function from CodePen
        function getPath(cx, cy, r, a1, a2) {
          const delta = a2 - a1;

          if (delta === 360) {
            return "M " + (cx - r) + " " + cy + " a " + r + " " + r + " 0 1 0 " + r * 2 + " 0 a " + r + " " + r + " 0 1 0 " + -r * 2 + " 0z";
          }

          const largeArc = delta > 180 ? 1 : 0;
          a1 = a1 * RAD - PI_2;
          a2 = a2 * RAD - PI_2;

          const x1 = cx + r * Math.cos(a2);
          const y1 = cy + r * Math.sin(a2);
          const x2 = cx + r * Math.cos(a1);
          const y2 = cy + r * Math.sin(a1);

          return "M " + x1 + " " + y1 + " A " + r + " " + r + " 0 " + largeArc + " 0 " + x2 + " " + y2 + " L " + cx + " " + cy + "z";
        }

        // updatePath function from CodePen
        function updatePath() {
          arcPath.setAttribute("d", getPath(arc.cx, arc.cy, arc.r, arc.start, arc.end));
        }

        // Apply clipPath and start animation
        logoContainer.style.transition = 'opacity 0.3s ease-in-out';
        logoContainer.style.opacity = '1';
        logo.style.clipPath = 'url(#logoClipArc)';

        // Start with empty path
        updatePath();

        // Animate the arc from 0 to 360 degrees over 2 seconds
        const startTime = Date.now();
        const duration = 2000;

        function animate() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          arc.end = progress * 360;
          updatePath();

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Cleanup after animation
            setTimeout(() => {
              logo.style.clipPath = 'none';
              if (svg.parentNode) {
                svg.parentNode.removeChild(svg);
              }
            }, 100);
          }
        }

        // Start animation after a small delay
        setTimeout(() => {
          animate();
        }, 50);
      }
    }
  }, initialDelay);

  // Then animate Finley letters with terminal effect
  if (finleyHeading) {
    const finleyLetters = finleyHeading.querySelectorAll('span');
    let finleyAnimationEndTime = initialDelay + 1500; // Base time for Finley animation start (after logo completes)

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
        initialDelay + 700 + letterDelay
      );

      // Calculate when the last letter's animation will end
      finleyAnimationEndTime = Math.max(
        finleyAnimationEndTime,
        initialDelay + 700 + letterDelay + 300
      );
    });

    // Remove cursor after all letters are typed
    setTimeout(() => {
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    }, finleyAnimationEndTime + 500);

    // Animate Club Name at the same time as logo
    const clubNameAnimationStartTime = initialDelay; // Start same time as logo
    setTimeout(() => {
      if (clubText) {
        clubText.classList.add('animate'); // Add .animate class to trigger CSS animation
      }
    }, clubNameAnimationStartTime);

    const clubNameAnimationDuration = 2000; // Duration of club name fade-in (from CSS)

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

          // Get the text and logo elements
          const logoContainer = document.querySelector('.logo-container');
          const finleyHeading = document.querySelector('.finley-animated-heading');
          // Club text already selected as clubText

          // Add animation to move logo up and out - synchronized
          if (logoContainer) {
            logoContainer.style.transition = 'transform 1.2s ease-in-out, opacity 1s ease-in-out';
            logoContainer.style.transform = 'translateY(-100px)';
            logoContainer.style.opacity = '0';
            setTimeout(() => (logoContainer.style.visibility = 'hidden'), 1200);
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
