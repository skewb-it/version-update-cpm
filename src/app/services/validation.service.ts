import { Injectable } from '@angular/core';
import { AbstractControl, Validators, FormGroup, FormBuilder, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationModel } from 'src/app/models/common/validators.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(
    private formBuilder: FormBuilder
  ) { }
  createFormGroup(formData) {

    const group = this.formBuilder.group({}, { validator: this.bindValidations(formData.groupValidations) });
    if (formData && formData.controls) {
      formData.controls.forEach(formControl => {

        if (formControl.controlType == "formarray") {
          let control = null;
          if (formControl && formControl.controls) {
            control = this.formBuilder.array([this.createFormGroup(formControl)]);
          } else {
            control = this.formBuilder.array([]);
          }

          group.addControl(formControl.controlName, control);
        } else {


          let validation: ValidatorFn = null;
          validation = this.bindValidations(formControl.validations || [])
          const control: FormControl = this.formBuilder.control(
            formControl.value,
            validation
          );
          group.addControl(formControl.controlName, control);
        }
      });
    }


    return group;

  }

  getValidator(validation: any) {
    switch (validation.name) {
      case "required":
        validation.defaultMessage = 'This field is required';
        return ValidationService.validatorFn(validation, Validators.required);
      case "minlength":
        validation.defaultMessage = `Min length is ${validation.params}`;
        return ValidationService.validatorFn(validation, Validators.minLength(validation.params));
      case "maxlength":
        validation.defaultMessage = `Max length is ${validation.params}`;
        return ValidationService.validatorFn(validation, Validators.maxLength(validation.params));
      case "min":
        validation.defaultMessage = `Minimum number can be ${validation.params}`;
        return ValidationService.validatorFn(validation, Validators.min(validation.params));
      case "max":
        validation.defaultMessage = `Maximum  required number is ${validation.params}`;
        return ValidationService.validatorFn(validation, Validators.max(validation.params));
      case "email":
        validation.defaultMessage = 'Please enter a valid email address';
        return ValidationService.validatorFn(validation, Validators.email);
      case "pattern":
        validation.defaultMessage = 'This field is invalid';
        return ValidationService.validatorFn(validation, Validators.pattern(validation.params));
      case "dateCompare":
        validation.defaultMessage = 'Invalid field';
        return ValidationService.dateCompare(validation);
      case "dataCompare":
        validation.defaultMessage = 'fields should match';
        return ValidationService.dataCompare(validation);
      case "bothDateCheck":
        validation.defaultMessage = 'Both fields are required';
        return ValidationService.bothDateCheck(validation);
    }
  }

  bindValidations(validations: any) {

    if (validations && validations.length > 0) {
      const validList = [];
      validations.forEach(validation => {
        let validator;
        validator = this.getValidator(validation);
        validList.push(validator);
      });
      return Validators.compose(validList);
    }
    return null;

  }


  static dataCompare(validation: ValidationModel): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      if (group) {

        const field1Value = group.get(validation.field1) ? group.get(validation.field1).value : null;
        const field2Value = group.get(validation.field2) ? group.get(validation.field2).value : null;
        if (field1Value && field2Value) {
          let validateResult = false;
          eval(`validateResult = field1Value.valueOf() ${validation.operator} field2Value.valueOf()`);
          if (!validateResult) {
            let errorData = {};
            let errorMessage = ValidationService.getErrorMessage(validation, null, null, group);
            errorData[validation.name] = {
              errorMessage: errorMessage
            };
            return errorData
          }
          return null;
        }
        return null;
      }
      return null;
    };
  }

  static dateCompare(validation: ValidationModel): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      if (group) {
        const dateString1 = group.get(validation.field1) ? group.get(validation.field1).value : null;
        const dateString2 = group.get(validation.field2) ? group.get(validation.field2).value : null;
        if (dateString1 && dateString2) {
          const field1 = new Date(dateString1);
          const field2 = new Date(dateString2)
          let validateResult = false;
          eval(`validateResult = field1.valueOf() ${validation.operator} field2.valueOf()`);
          if (!validateResult) {
            let errorData = {};
            let errorMessage = ValidationService.getErrorMessage(validation, null, null, group);
            errorData[validation.name] = {
              errorMessage: errorMessage
            };
            return errorData
          }
          return null;
        }
        return null;
      }
      return null;
    };
  }

  static bothDateCheck(validation: ValidationModel): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      if (group) {
        let dateString1 = group.get(validation.field1) ? group.get(validation.field1).value : null;
        let dateString2 = group.get(validation.field2) ? group.get(validation.field2).value : null;
        let errorData = {};
        let errorMessage = ValidationService.getErrorMessage(validation, null, null, group);
        errorData[validation.name] = {
          errorMessage: errorMessage
        };

        dateString1 = dateString1 ? dateString1.toString() : '';
        dateString2 = dateString2 ? dateString2.toString() : '';
        if (dateString1.length > 0 || dateString2.length > 0) {
          if ((dateString1.length > 0) && (dateString2.length == 0)) {
            return errorData;
          } else if ((dateString2.length > 0) && (dateString1.length == 0)) {
            return errorData;
          }
        }
        return null;
      }
      return null;
    };
  }

  static validatorFn(validation: ValidationModel, validator: any): ValidatorFn {
    return (control: AbstractControl,): { [key: string]: any } | null => {
      const validationErrors: ValidationErrors = validator(control);
      if (validationErrors) {
        let errorMessage = ValidationService.getErrorMessage(validation, control, validationErrors);
        let errorData = {};
        errorData[validation.name] = {
          validationErrors,
          errorMessage: errorMessage
        };
        return errorData
      }
      return null;
    };
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  getValidations(controlName, validationData) {
    return validationData.find(v => v.controlName === controlName).validations;
  }

  getValidationsFromArray(formarrayName: string, controlName: string, validationData: any[]) {
    return validationData.find(v => v.controlName === formarrayName).controls.find(c => c.controlName == controlName).validations;
  }

  static getErrorMessage(validation: ValidationModel, control: AbstractControl, validationErrors: ValidationErrors, formFroup?: FormGroup) {
    let message = validation.defaultMessage;
    if (validation.message) {
      if (validation.message.value) {
        message = validation.message.value;
      }
      if (!validation.message.isStatic && message && validation.message.dynamicParams) {
        validation.message.dynamicParams.forEach(element => {
          const regexp = new RegExp(element.field, 'g');
          let controlValue = '';
          eval(`controlValue = ${element.value}`);
          message = message.replace(regexp, controlValue);
        });
      }
    }
    return message;
  }
}
