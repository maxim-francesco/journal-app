import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  getRelativeTime(dateString: string): string {
    // Parse the input date
    const inputDate = new Date(dateString);
    const now = new Date();

    // Check for invalid date
    if (isNaN(inputDate.getTime())) {
      return 'Invalid date';
    }

    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - inputDate.getTime();
    const diffSeconds = Math.abs(diffMs / 1000);
    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;

    // Determine if the date is in the future or past
    const isFuture = diffMs < 0;

    // Helper function to format the output
    const format = (value: number, unit: string) => {
      const rounded = Math.round(value);
      const plural = rounded === 1 ? '' : 's';
      return isFuture
        ? `in ${rounded} ${unit}${plural}`
        : `${rounded} ${unit}${plural} ago`;
    };

    // Handle different time ranges
    if (diffDays >= 365) {
      const years = diffDays / 365;
      return format(years, 'year');
    } else if (diffDays >= 30) {
      const months = diffDays / 30;
      return format(months, 'month');
    } else if (diffDays >= 7) {
      const weeks = diffDays / 7;
      return format(weeks, 'week');
    } else if (diffDays >= 2) {
      return format(diffDays, 'day');
    } else if (diffDays >= 1) {
      return isFuture ? 'tomorrow' : 'yesterday';
    } else if (diffHours >= 1) {
      return format(diffHours, 'hour');
    } else if (diffMinutes >= 1) {
      return format(diffMinutes, 'minute');
    } else {
      return diffSeconds >= 1 ? format(diffSeconds, 'second') : 'just now';
    }
  }
}
