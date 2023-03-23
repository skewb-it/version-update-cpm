import { Component, OnInit, Input } from '@angular/core';
import { PermitAddCommentDataModel, PermitAddCommentConfigModel } from './add-comment.model';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitAddCommentDataModel;
  @Input() configModel: PermitAddCommentConfigModel;

  arrTopics: any[] = [
    {
      value: "GENERAL",
      viewValue: "General"
    },
    {
      value: "SECTION_74",
      viewValue: "Section 74"
    },
    {
      value: "INSPECTION",
      viewValue: "Inspection"
    },
    {
      value: "FPN",
      viewValue: "FPN"
    },
    {
      value: "OVERRUN",
      viewValue: "Overrun"
    },
    {
      value: "FORWARD_PLAN",
      viewValue: "Forward Plan"
    },
    {
      value: "CHANGE_REQUEST",
      viewValue: "Change Request"
    },
    {
      value: "IMPOSED_VARIATION",
      viewValue: "Imposed Variation"
    },
    {
      value: "DURATION_CHALLENGE",
      viewValue: "Duration Challenge"
    },
    {
      value: "SECTION_81",
      viewValue: "Section 81"
    }
  ];
  errorMsg: string = "";

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _ngxSpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'topic': ['', [Validators.required]],
      'content': ['', [Validators.required]]
    })
  }

  setFieldData() {
  }
  getControlData() {
  }
  convertData(response: any) {
  }
  setMode(responseDataModel: any) {
  }
  setValue(responseDataModel: any) {
  }

  onAddCommentButtonClick() {

    this.wgFormGroup.markAllAsTouched();

    if (this.wgFormGroup.valid) {

      let data: any = {
        "content": this.wgFormGroup.controls.content.value,
        "topic": this.wgFormGroup.controls.topic.value,
        "type": "EXTERNAL"
      }

      let applicationId = this.dataModel.globalParameters.get('applicationId');
      this._ngxSpinnerService.show();
      this._serverApi.post<any, any>(`/api/v1/applications/${applicationId}/comments`, data).subscribe(
        response => {
          try {
            if (response && response.applicationId) {

              this.wgReset();
              this.wgFormGroup.markAsUntouched();          
              this.emitEvent('onCommentAdded');
              this._ngxSpinnerService.hide();
            }
          } catch (e) {
            this._ngxSpinnerService.hide();
          }
        }, error => {
          this._ngxSpinnerService.hide();
          console.log('Comment add error :');
        }
      );

    }

  }

}
