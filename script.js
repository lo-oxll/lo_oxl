/**
 * Ali Kamil — profile card
 * Small, dependency-free enhancement layer:
 *  - reveals the card once fonts/layout are ready
 *  - respects prefers-reduced-motion
 *  - guards against the reveal class being stuck off if JS is slow/blocked
 */
(function () {
  'use strict';

  var card = document.getElementById('card');
  if (!card) return;

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function reveal() {
    card.classList.add('is-visible');
  }

  if (prefersReducedMotion) {
    // No animation needed — just make sure content is visible immediately.
    card.style.opacity = '1';
    card.style.transform = 'none';
    return;
  }

  // Reveal on the next frame so the initial (hidden) state has painted first,
  // guaranteeing the CSS transition actually runs.
  if (document.readyState === 'complete') {
    requestAnimationFrame(reveal);
  } else {
    window.addEventListener('load', function () {
      requestAnimationFrame(reveal);
    });
  }

  // Safety net: never leave the card invisible for more than a beat,
  // even if the load event is delayed by a slow network resource.
  window.setTimeout(reveal, 1200);
})();
