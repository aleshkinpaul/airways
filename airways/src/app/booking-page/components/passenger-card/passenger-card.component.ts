import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PassengerFormGroup } from '@booking/models/PassengerFormModels';

export interface personData {
  firstName: string;
  lastName: string;
  gender: string;
  birthdayDate: string;
}

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss'],
})
export class PassengerCardComponent {
  @Input() name!: string;
  @Input() accessible!: boolean;
  @Input() card!: FormGroup<PassengerFormGroup>;
}
