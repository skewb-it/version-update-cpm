import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PermitCancelConfirmDataModel, PermitCancelConfirmConfigModel } from './cancel-permit-confirmation.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetConstants } from 'src/app/constants/widget-constants';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';

@Component({
  selector: 'app-cancel-permit-confirmation',
  templateUrl: './cancel-permit-confirmation.component.html',
  styleUrls: ['./cancel-permit-confirmation.component.css']
})
export class CancelPermitConfirmationComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitCancelConfirmDataModel;
  @Input() configModel: PermitCancelConfirmConfigModel;

  arrCancellationReason: any[] = [];

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private fb: FormBuilder,
    private _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService,
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.wgOnInit();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'cancellationReason': ['', [Validators.required]],
      'comment': ['', [Validators.required]]
    });
  }

  setFieldData() {
    this.arrCancellationReason = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.CANCELLATION_REASON.toString());
  }

  getControlData() {
  }

  convertData(response: any) {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  onActionBtnClick(action) {
    if (action) {

      this.wgFormGroup.markAllAsTouched;

      if (this.wgFormGroup.valid) {
        this.dataModel.data.cancellation_reason = this.wgFormGroup.controls.cancellationReason.value;
        this.dataModel.data.comments = this.wgFormGroup.controls.comment.value;
        this.wgAPIMethodPut(this.dataModel.apiDataUrl, this.dataModel.data).then(resp => {
          this.emitEvent('onCancelPermitActionBtnClick', true);
        });
      }

    } else {
      this.emitEvent('onCancelPermitActionBtnClick', false);
    }
  }

}
