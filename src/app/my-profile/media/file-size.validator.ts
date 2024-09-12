import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

// Custom validator function to validate file size
export function fileSizeValidator(maxSize: number) {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const file = control.value;

      if (file) {
        const fileSize = file.size; // File size in bytes
        if (fileSize > maxSize) {
          return of({ fileSizeExceeded: true }).pipe(delay(1000)); // Mock async operation with delay
        }
      }
      return of(null).pipe(delay(1000)); // Async response, no errors
    };
  }
