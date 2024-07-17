import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { CrudService } from "../services/crud.service";

export class CrudValidators {
    static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === '12345678')
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 2000);
        });

    }

    static checkAge(control: AbstractControl): ValidationErrors | null {
        if (control.value !== null && control.value <= 0) {
            return {checkAge: true}
        }
        return null;
    }

}