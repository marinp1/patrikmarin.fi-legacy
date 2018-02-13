// Extremely shitty way to use node modules without
// having to write typings for them.

import disableScroll from 'disable-scroll';

export function disableScrolling() {
  disableScroll.on();
  return true;
}

export function enableScrolling() {
  disableScroll.off();
  return true;
}