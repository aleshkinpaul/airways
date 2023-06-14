import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-baggage',
  templateUrl: './baggage.component.html',
  styleUrls: ['./baggage.component.scss'],
  animations: [
    trigger('increaseSymbol', [
      state('*', style('*')),
      transition(
        '* <=> *',
        animate(
          '0.3s',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.3)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        )
      ),
    ]),
  ],
})
export class BaggageComponent implements OnInit {
  @Input() baggageControl!: FormControl<number | null>;
  @Input() baggageName!: string;

  public count = 0;
  public stateIncrease = true;
  public stateDecrease = true;

  ngOnInit(): void {
    if (this.baggageControl.value !== null)
      this.count = this.baggageControl.value;
  }

  public increasePassengersCount() {
    this.count++;
    this.setBaggageFormValue();
    this.increaseAnimation();
  }

  public decreasePassengersCount() {
    if (this.count > 0) this.count--;
    this.setBaggageFormValue();
    this.decreaseAnimation();
  }

  private setBaggageFormValue(): void {
    this.baggageControl.setValue(this.count);
  }

  private increaseAnimation() {
    this.stateIncrease = !this.stateIncrease;
  }

  private decreaseAnimation() {
    this.stateDecrease = !this.stateDecrease;
  }
}
