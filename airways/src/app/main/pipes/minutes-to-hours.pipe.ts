import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours',
})
export class MinutesToHoursPipe implements PipeTransform {
  transform(minutes: number | undefined): string {
    if (!minutes) return '0m';
    const hours: number = Math.floor(minutes / 60);
    return hours === 0 ? `${minutes}m` : `${hours}h ${minutes - hours * 60}m`;
  }
}
