import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService implements OnInit {
 
  // Regular expression for name validation (only characters, no leading spaces)
  readonly namePattern = /^[a-zA-Z]+[a-zA-Z\s]*$/;

  // Regular expression for mobile number validation (exactly 10 digits, no leading spaces)
  readonly mobilePattern = /^[0-9]{10}$/;
  readonly amountPattern = /^[1-9][0-9]*\.?[0-9]*$/;
  readonly emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  //readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/
  readonly execlPattern = /\.xlsx?$/i
  readonly imagePattern = /\.(png|jpe?g|pdf)$/i
  readonly nonNegativeValidator = /^(?!-?\d+$)[A-Za-z\d]+$/
  // Regular expression for password validation (at least 8 characters with special characters)
  readonly passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$/;
  yearList: any;
  
  //Pincode
  readonly pincode = /^\d{6}$/
  // Common validator function to check if the input value matches the provided pattern
  patternValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // If the field is empty, it's considered valid
        return null;
      }
      
      const valid = pattern.test(control.value);
      if (!valid) {
        // If the value doesn't match the pattern, show the error
        return { pattern: true };
      }
      
      // Value matches the pattern, so it's valid
      return null;
    };
  }
  

  // Validator functions for specific fields
  nameValidator()  {
    return Validators.compose([
      this.patternValidator(this.namePattern),
    ]);
  }

  mobileNumberValidator():any{
    return Validators.compose([this.patternValidator(this.mobilePattern)]);
  }

  passwordValidator() {
    return Validators.compose([
      this.patternValidator(this.passwordPattern),
    ]);
  }
  ngOnInit(): void {
   
  }
}
