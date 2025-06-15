import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthBeforeHireValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const birthDate = formGroup.get('birthDate')?.value;
    const hireDate = formGroup.get('hireDate')?.value;

    if (birthDate && hireDate && new Date(hireDate) <= new Date(birthDate)) {
      return { hireBeforeBirth: true };
    }

    return null;
  };
}
