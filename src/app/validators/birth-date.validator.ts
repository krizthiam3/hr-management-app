import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthDateNotInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = control.value;
    const today = new Date();

    if (birthDate && new Date(birthDate) > today) {
      return { birthDateInFuture: true };
    }

    return null;
  };
}
