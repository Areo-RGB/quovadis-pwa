// js/homePageHeroAnimations.js
export function initHomePageHeroAnimations() {
  console.log('Initializing Homepage Hero Animations');

  // Add initial delay to account for page loading
  const initialDelay = 800; // 800ms delay before starting animations

  // Get text elements for initial fade-in
  const charlierText = document.querySelector('.card-bottom h1.font-24');
  const finleyHeading = document.querySelector('.finley-animated-heading');
  const clubText = document.querySelector('.card-bottom p.opacity-70');

  // Set initial opacity to 0
  if (charlierText) charlierText.style.opacity = '0';
  if (clubText) clubText.style.opacity = '0';

  // Fade in Charlier text first
  setTimeout(() => {
    if (charlierText) {
      charlierText.style.transition = 'opacity 0.8s ease-in-out';
      charlierText.style.opacity = '1';
    }
  }, initialDelay);

  // Then animate Finley letters
  if (finleyHeading) {
    const finleyLetters = finleyHeading.querySelectorAll('span');
    finleyLetters.forEach((span, index) => {
      span.style.animationDelay = `${initialDelay + 400 + index * 100}ms`;
      span.classList.add('fade-in-letter-anim');
    });

    const finleyAnimationTimePerLetter = 0.5; // seconds
    const finleyLastLetterDelay = finleyLetters.length > 0 ? (finleyLetters.length - 1) * 0.1 : 0;
    const totalFinleyAnimationDuration =
      (finleyLastLetterDelay + finleyAnimationTimePerLetter) * 1000; // milliseconds

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
    elementsToRender.push({ type: 'stat', data: gesamtleistungData, isSummary: true });

    const statsContainer = document.querySelector('.statistics-container');

    if (statsContainer) {
      const statsAnimationStartTime = totalFinleyAnimationDuration + 200; // Start stats after Finley animation + buffer

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
          const clubText = document.querySelector('.card-bottom p.opacity-70');

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
            clubText.style.opacity = '0';
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
      }, statsAnimationStartTime);
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
