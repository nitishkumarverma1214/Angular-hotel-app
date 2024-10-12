import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CheckOutDateValidator(): ValidatorFn {
  return (checkOutDateControl: AbstractControl): ValidationErrors | null => {
    const formGroup = checkOutDateControl.parent;
    if (!formGroup) {
        return null; // If formGroup is not defined, we can't validate
    }
    const checkInDateControl = formGroup.get('checkInDate');

    if (checkInDateControl && checkOutDateControl) {
      const checkInDate = checkInDateControl.value;
      const checkOutDate = checkOutDateControl.value;

      // Validate that the checkout date is after the check-in date
      if (
        checkInDate &&
        checkOutDate &&
        new Date(checkOutDate) <= new Date(checkInDate)
      ) {
        return { inValidCheckOutDate: true }; // Return validation error
      }
    }

    return null;
  };
}
