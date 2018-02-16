import animateScrollTo from 'animated-scroll-to';

export function animateToElement(elem) {
  animateScrollTo(elem, { minDuration: 500 });
}