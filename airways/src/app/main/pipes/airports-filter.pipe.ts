import { Pipe, PipeTransform } from '@angular/core';
import { AirportsRes } from '@redux/models/main-page.models';

@Pipe({
  name: 'airportsFilter',
})
export class AirportsFilterPipe implements PipeTransform {
  transform(
    airports: AirportsRes[] | null,
    selectedAirport: AirportsRes | null
  ): AirportsRes[] {
    if (!selectedAirport) {
      return airports || [];
    } else if (airports) {
      return airports.filter((airport) => airport.key !== selectedAirport.key);
    }
    return [];
  }
}
