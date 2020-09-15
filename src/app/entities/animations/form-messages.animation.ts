import { animate, animation, style } from '@angular/animations';

export const showFormMessage = animation([
  style({
    opacity: 0
  }),
  animate('300ms ease-in-out')
]);

export const hideFormMessage = animation([
  style({
    opacity: 1
  }),
  animate('300ms ease-in-out', style({
    opacity: 0
  }))
]);
