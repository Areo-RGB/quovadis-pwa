import { initStatisticsAnimation } from './statisticsAnimation.js';

// Move getPath, updatePath, and animate to the very top of initHomePageHeroAnimations
function getPath(cx, cy, r, a1, a2) {
  const delta = a2 - a1;
  if (delta === 360) {
    return (
      'M ' +
      (cx - r) +
      ' ' +
      cy +
      ' a ' +
      r +
      ' ' +
      r +
      ' 0 1 0 ' +
      r * 2 +
      ' 0 a ' +
      r +
      ' ' +
      r +
      ' 0 1 0 ' +
      -r * 2 +
      ' 0z'
    );
  }
  const largeArc = delta > 180 ? 1 : 0;
  a1 = (a1 * Math.PI) / 180 - Math.PI / 2;
  a2 = (a2 * Math.PI) / 180 - Math.PI / 2;
  const x1 = cx + r * Math.cos(a2);
  const y1 = cy + r * Math.sin(a2);
  const x2 = cx + r * Math.cos(a1);
  const y2 = cy + r * Math.sin(a1);
  return (
    'M ' +
    x1 +
    ' ' +
    y1 +
    ' A ' +
    r +
    ' ' +
    r +
    ' 0 ' +
    largeArc +
    ' 0 ' +
    x2 +
    ' ' +
    y2 +
    ' L ' +
    cx +
    ' ' +
    cy +
    'z'
  );
}

function updatePath(arcPath, arc, getPathFn) {
  arcPath.setAttribute('d', getPathFn(arc.cx, arc.cy, arc.r, arc.start, arc.end));
}

function animate(arc, arcPath, getPathFn, logo, svg, startTime, duration) {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / duration, 1);
  arc.end = progress * 360;
  updatePath(arcPath, arc, getPathFn);
  if (progress < 1) {
    requestAnimationFrame(function() {
      animate(arc, arcPath, getPathFn, logo, svg, startTime, duration);
    });
  } else {
    setTimeout(function() {
      logo.style.clipPath = 'none';
      if (svg.parentNode) {
        svg.parentNode.removeChild(svg);
      }
    }, 100);
  }
}

export function initHomePageHeroAnimations() {
  console.log('Initializing Homepage Hero Animations');

  // Add initial delay to account for page loading
  const initialDelay = 2500; // 2500ms delay before starting animations

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
        const arc = {
          start: 0,
          end: 0,
          cx: 50,
          cy: 50,
          r: 60,
        };

        // Apply clipPath and start animation
        logoContainer.style.transition = 'opacity 0.3s ease-in-out';
        logoContainer.style.opacity = '1';
        logo.style.clipPath = 'url(#logoClipArc)';

        // Start with empty path
        updatePath(arcPath, arc, getPath);

        // Animate the arc from 0 to 360 degrees over 2 seconds
        const startTime = Date.now();
        const duration = 2000;

        // Start animation after a small delay
        setTimeout(() => {
          animate(arc, arcPath, getPath, logo, svg, startTime, duration);
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
    finleyLetters.forEach(function(span) {
      span.style.opacity = '0';
      span.style.transform = 'translateX(20px)';
      span.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    });

    // Animate letters from left to right (F, I, N, L, E, Y)
    finleyLetters.forEach(function(span, index) {
      const letterDelay = index * 300; // Longer delay between letters
      setTimeout(
        function() {
          span.style.opacity = '1';
          span.style.transform = 'translateX(0)';

          // Apply special styling to F during animation
          if (index === 0) {
            span.style.setProperty('font-size', '1.3em', 'important');
            span.style.setProperty('color', '#0064c8', 'important');
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
      // Show the Enter button after Finley animation is done
      const enteBtn = document.getElementById('ente-btn');
      if (enteBtn) {
        enteBtn.style.display = 'block';
      }
    }, finleyAnimationEndTime + 500);

    // Animate Club Name at the same time as logo
    const clubNameAnimationStartTime = initialDelay; // Start same time as logo
    setTimeout(() => {
      if (clubText) {
        clubText.classList.add('animate'); // Add .animate class to trigger CSS animation
      }
    }, clubNameAnimationStartTime);

    // Initialize statistics animation from separate module
    // Statistics animation has been extracted to a separate file
    initStatisticsAnimation();
  } else {
    console.warn('HeroAnimations: Finley heading .finley-animated-heading not found.');
  }
}

// Initialize automatically when module is loaded
document.addEventListener('DOMContentLoaded', function () {
  initHomePageHeroAnimations();
});
