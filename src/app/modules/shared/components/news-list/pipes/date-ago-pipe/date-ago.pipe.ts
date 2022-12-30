import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    if (!value) {
      return value;
    }

    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

    if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
      return 'Just now';
    }

    const intervals = new Map<string, number>([
      ['year', 31536000],
      ['month', 2592000],
      ['week', 604800],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
      ['second', 1]
    ]);

    const twoDaysInSecond = intervals.get('day') * 2;

    for (const item of intervals) {
      const counter = Math.floor(seconds / item[1]);
      if (counter > 0) {
        if (args && args === 'publication' && seconds >= twoDaysInSecond) {
          const datePipe = new DatePipe(`en-US`);
          return datePipe.transform(value, 'd-MMM-yyyy');
        }

        value = `${counter} ${item[0]}${counter === 1 ? ' ago' : 's ago'}`;
        break;
      }
    }

    return value;
  }
}
