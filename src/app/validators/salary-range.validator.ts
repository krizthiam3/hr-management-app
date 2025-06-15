import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function salaryRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && (value < min || value > max)) {
      return { salaryRange: { min, max } };
    }
    return null;
  };
}
