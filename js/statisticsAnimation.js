// Statistics Animation Module
// This module handles the animation of statistics data on the home page

export function initStatisticsAnimation() {
  console.log('Initializing Statistics Animation');

  // Get the statistics container
  const statsContainer = document.querySelector('.statistics-container');
  if (!statsContainer) {
    console.warn('StatisticsAnimation: Statistics container .statistics-container not found.');
    return;
  }

  // Initial stats data
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

  // Prepare the elements to render
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

  // Stats animation should start after club name animation is complete + a small buffer
  // Adjust these timing values as needed
  const initialDelay = 2500;
  const clubNameAnimationStartTime = initialDelay;
  const clubNameAnimationDuration = 2000;
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
      const clubText = document.querySelector('.fade-in-club-name');

      // Add animation to move logo up and out - synchronized
      if (logoContainer) {
        logoContainer.style.transition = 'transform 1.2s ease-in-out, opacity 1s ease-in-out';
        logoContainer.style.transform = 'translateY(-100px)';
        logoContainer.style.opacity = '0';
        setTimeout(() => (logoContainer.style.visibility = 'hidden'), 1200);
      }

      // Add animation for FINLEY text
      if (finleyHeading) {
        finleyHeading.style.transition =
          'transform 1.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 1s ease-in-out';
        finleyHeading.style.transform = 'translateY(-30px) scale(0.92)';
        finleyHeading.style.opacity = '0.9';
      }

      // Add animation for club text
      if (clubText) {
        clubText.style.transition =
          'transform 1.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 1s ease-in-out';
        clubText.style.transform = 'translateY(-20px)';
        clubText.style.opacity = '0';
      }

      // Show the Ente button after all animations are done
      const enteBtn = document.getElementById('ente-btn');
      if (enteBtn) {
        enteBtn.style.display = 'block';
      }

      // Video swiper will be handled by its module as it comes after stats fadeout
    }, animationCompletionTime + 5000); // 5000ms (5s) after all stats are shown
  }, statsActualStartTime);
}

// Add CSS for statistics animation
document.addEventListener('DOMContentLoaded', function () {
  // Create a style element
  const styleEl = document.createElement('style');

  // Add the CSS content
  styleEl.textContent = `
    /* Statistics Animation */
    .statistic-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      color: white;
      opacity: 0;
      /* Overall item starts transparent, animated by JS for parts */
      transition: opacity 0.3s ease-in-out;
      min-height: 2.4em;
    }

    .statistic-item .stat-exercise-name,
    .statistic-item .stat-result,
    .statistic-item .stat-rating-container {
      opacity: 0;
      /* Parts start hidden, animated by JS classes */
      white-space: nowrap;
    }

    .statistic-item .stat-exercise-name {
      flex-basis: 35%;
      flex-shrink: 0;
      text-align: left;
    }

    .statistic-item .stat-result {
      font-weight: 600;
      flex-basis: 20%;
      flex-shrink: 0;
      text-align: right;
    }

    .animate-slide-in-left {
      animation: slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .animate-slide-in-right {
      animation: slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    @keyframes slideInFromLeft {
      0% {
        transform: translateX(-40px);
        opacity: 0;
      }

      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideInFromRight {
      0% {
        transform: translateX(40px);
        opacity: 0;
      }

      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Rating Label specific styles */
    .stat-rating-container {
      text-align: center;
      flex-grow: 1;
      flex-basis: 45%;
    }

    .stat-rating-text {
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      display: inline-block;
      line-height: 1.3;
      font-size: 0.85em;
      text-transform: uppercase;
    }

    .label-ausgezeichnet {
      background-color: rgba(40, 167, 69, 0.7);
      color: white;
    }

    .label-sehr-gut {
      background-color: rgba(0, 123, 255, 0.7);
      color: white;
    }

    .label-durchschnittlich {
      background-color: rgba(255, 193, 7, 0.7);
      color: #212529;
    }

    .label-unterdurchschnittlich {
      background-color: rgba(220, 53, 69, 0.7);
      color: white;
    }

    .statistics-container .divider.divider-prominent {
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin-top: 10px;
      margin-bottom: 10px;
      /* More visual prominence */
      border-top: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* Styling for the "Gesamtleistung" summary item */
    .statistic-item-summary {
      margin-top: 10px;
      /* Extra space above the summary item */
      /* You could add a subtle top border or background if desired */
      /* border-top: 1px solid rgba(255,255,255,0.15); */
      /* padding-top: 10px; */
    }

    .statistic-item-summary .stat-exercise-name {
      font-size: 1.15em !important;
      /* Noticeably larger */
      font-weight: 700 !important;
      /* Bolder */
      flex-basis: 40% !important;
      /* Adjust basis if needed for longer text */
    }

    .statistic-item-summary .stat-result {
      font-size: 1.15em !important;
      /* Noticeably larger */
      font-weight: 700 !important;
      /* Bolder */
      flex-basis: 25% !important;
      /* Adjust basis */
    }

    .statistic-item-summary .stat-rating-container {
      flex-basis: 35% !important;
      /* Adjust basis */
    }

    .statistic-item-summary .stat-rating-container .stat-rating-text {
      font-size: 0.9em !important;
      /* Slightly larger label */
      font-weight: bold !important;
      padding: 6px 12px !important;
      /* More padding for emphasis */
    }

    /* Add rating drop in animation */
    @keyframes ratingDropIn {
      0% {
        transform: translateY(-20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .animate-rating-drop-in {
      animation: ratingDropIn 0.4s ease-out forwards;
    }
  `;

  // Append the style element to the document head
  document.head.appendChild(styleEl);
});
