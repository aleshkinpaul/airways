import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  AllPassengerFormGroup,
  PassengerFormGroup,
} from '@booking/models/PassengerFormModels';

@Component({
  selector: 'app-all-passengers-card',
  templateUrl: './all-passengers-card.component.html',
  styleUrls: ['./all-passengers-card.component.scss'],
})
export class AllPassengersCardComponent {
  @Input() name!: string;
  @Input() accessible!: boolean;
  @Input() form!: FormArray<FormGroup<PassengerFormGroup>>;
  @Input() allForm!: FormGroup<AllPassengerFormGroup>;
}
