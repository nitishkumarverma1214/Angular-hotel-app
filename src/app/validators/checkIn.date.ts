import { AbstractControl, ValidationErrors , ValidatorFn} from "@angular/forms"

export function checkInDateValidator(): ValidatorFn{

    return (control: AbstractControl): ValidationErrors | null =>{
        const value = control.value;

        if (!value) {
            return null;
        }

        return  new Date(value) < new Date() ? {inValidCheckInDate: true} : null;
    }
}