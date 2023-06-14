import { Directive, Input, OnChanges, ElementRef } from '@angular/core';
import { ISeats } from '@redux/models/main-page.models';

@Directive({
  selector: '[appSeats]',
})
export class SeatsDirective implements OnChanges {
  @Input() seats?: ISeats;
  @Input() isTransparent?: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.setBackground();
  }

  setBackground(): void {
    this.el.nativeElement.classList.add(
      this.getBackgroundColor() + (this.isTransparent ? '-transparent' : '')
    );
  }

  getBackgroundColor(): string {
    if (!this.seats?.avaible) return 'seats-red-bg';
    return this.seats?.avaible < 10
      ? 'seats-red-bg'
      : this.seats?.avaible / this.seats?.total < 0.5
      ? 'seats-yellow-bg'
      : 'seats-green-bg';
  }
}
