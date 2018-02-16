import animateScrollTo from 'animated-scroll-to';

export function animateToElement(elem) {
  animateScrollTo(elem, { speed: 5000, minDuration: 800 });
}