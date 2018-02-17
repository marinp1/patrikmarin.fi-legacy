import animateScrollTo from 'animated-scroll-to';

export function animateToElement(elem) {
  animateScrollTo(elem, { speed: 500, minDuration: 800 });
}