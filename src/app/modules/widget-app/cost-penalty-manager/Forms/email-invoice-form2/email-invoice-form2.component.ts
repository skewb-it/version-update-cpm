import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  EmailInvoiceForm2ConfigModel,
  EmailInvoiceForm2Model,
} from './email-invoice-form2.model';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { VERSION } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
export function emailArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isPassed: boolean = true;

    if (Array.isArray(control.value)) {
      for (const email of control.value) {
        const innerControl: FormControl = new FormControl(
          email,
          Validators.email
        );
        if (innerControl.errors && innerControl.errors.email) {
          isPassed = false;
          break;
        }
      }
    } else {
      isPassed = false;
    }

    return isPassed ? null : { emailArray: true };
  };
}

export function requiredArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isPassed: boolean =
      Array.isArray(control.value) && control.value.length > 0;
    return isPassed ? null : { required: true };
  };
}
@Component({
  selector: 'app-email-invoice-form2',
  templateUrl: './email-invoice-form2.component.html',
  styleUrls: ['./email-invoice-form2.component.css'],
})
export class EmailInvoiceForm2Component
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: EmailInvoiceForm2Model;
  @Input() configModel: EmailInvoiceForm2ConfigModel;

  public version: string = VERSION.full;
  public emailFormControl: FormControl = new FormControl(
    [],
    [requiredArrayValidator(), emailArrayValidator()]
  );

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public oldForm: FormGroup = new FormGroup({
    email: new FormControl([], Validators.required),
    emailHelper: new FormControl(null, Validators.email),
  });

  public addEmailAddress(event: MatChipInputEvent): void {
    const formControl: AbstractControl = this.oldForm.get('email');
    const helperForm: AbstractControl = this.oldForm.get('emailHelper');
    const input: HTMLInputElement = event.input;
    const value: string = (event.value || '').trim();

    helperForm.updateValueAndValidity();

    if (helperForm.valid) {
      if (value) {
        formControl.setValue([...formControl.value, value]);
      }

      formControl.updateValueAndValidity();

      if (input) {
        input.value = '';
      }
    } else {
      formControl.setErrors({ email: true });
    }
  }

  public removeEmailAddress(selectedEmail: string): void {
    const formControl: AbstractControl = this.oldForm.get('email');
    const value: string[] = formControl.value.filter(
      (email: string) => email !== selectedEmail
    );
    formControl.setValue(value);
    formControl.updateValueAndValidity();
  }

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private _saveFileService: SaveFileService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit() {
    super.wgOnInit();
    // this.rulesForm = this.fb.group({
    //   emails: this.fb.array(
    //     [],
    //     [this.validateArrayNotEmpty, this.validateEmailPattern]
    //   ),
    // });
  }
  setFieldData() {}
  stopPropagation(event) {
    event.stopPropagation();
  }
  setMode(responseDataModel: any) {}
  setValue(responseDataModel: any) {}
  getControlData() {
    // let id = this.dataModel.globalParameters.get('applicationId');
    // // INFO: ServerAPI
    // let url = `/api/v1/applications/${id}`
    // return this.wgAPIMethodGet(url, null);
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(
        GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM
      );
      permitform = permitform ? permitform : new Object();
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }
  convertData(response: any) {}
  getValue() {
    if (this.emailFormControl.valid) {
      return this.emailFormControl.value;
    }
  }

  resetForm() {
    this.emailFormControl.reset();
  }
}
