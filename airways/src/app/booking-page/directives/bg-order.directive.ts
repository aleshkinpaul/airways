import { Directive, ElementRef, Renderer2 } from '@angular/core';

import { $bgLightSecondaryColor, $primaryColor } from '@core/consts/colors';

@Directive({
  selector: '[appBgOrder]',
})
export class BgOrderDirective {
  constructor(private render2: Renderer2, private elRef: ElementRef) {
    this.setAllStyles();
  }

  setAllStyles(): void {
    this.setStyle('background-color', $bgLightSecondaryColor);
    this.setStyle('box-shadow', `0px -3px 0px ${$primaryColor}`);
    this.setStyle('border-top-left-radius', '5px');
    this.setStyle('border-top-right-radius', '5px');
  }

  setStyle(style: string, value: string): void {
    this.render2.setStyle(this.elRef.nativeElement, `${style}`, `${value}`);
  }
}
