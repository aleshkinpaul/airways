import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-dialog',
  templateUrl: './place-dialog.component.html',
  styleUrls: ['./place-dialog.component.scss'],
})
export class PlaceDialogComponent {
  public selectedPlace: string | null = null;
  public selectedIndex!: { i: number; j: number };
  public places!: (string | boolean)[][];
  private flight$ = this.store.select(BookingSelectors.flightsSelector);
  private flightSub!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<PlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedPlace: string },
    private store: Store
  ) {
    this.getAvailableSeats();
  }

  getAvailableSeats() {
    this.flightSub = this.flight$.subscribe((flight) => {
      if (flight) {
        const seats = flight.forwardFlight.seats.avaibleArr;

        if (seats) {
          this.places = seats;
        }
      }
    });
  }

  isPlaceAvailable(row: number, col: number): boolean {
    const place = this.places[row][col];
    return typeof place === 'string';
  }

  onCellClick(place: string | boolean): void {
    if (typeof place !== 'string') return;
    const [row, col] = this.findPlaceCoordinates(place);
    if (this.isPlaceAvailable(row, col)) {
      this.selectedPlace = place;
      this.selectedIndex = { i: row, j: col };
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSelect(): void {
    this.dialogRef.close({
      place: this.selectedPlace,
      seatIndex: this.selectedIndex,
    });
  }

  private findPlaceCoordinates(place: string | boolean): [number, number] {
    for (let row = 0; row < this.places.length; row++) {
      for (let col = 0; col < this.places[row].length; col++) {
        if (
          typeof this.places[row][col] === 'string' &&
          this.places[row][col] === place
        ) {
          return [row, col];
        }
      }
    }
    return [-1, -1];
  }
}

//= [
//     [
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//     ],
//     [
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//     ],
//     [
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//     ],
//     [
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//     ],
//     [
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//     ],
//     [
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//       'Место 3',
//       'Место 4',
//       false,
//       'Место 2',
//     ],
//   ]
