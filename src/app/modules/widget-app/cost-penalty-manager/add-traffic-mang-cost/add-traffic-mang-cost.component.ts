import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { AddTrafficMangCostModel, AddTrafficMangCostConfigModel, AddTrafficMangCostDataModel } from './add-traffic-mang-cost.model';

@Component({
  selector: 'app-add-traffic-mang-cost',
  templateUrl: './add-traffic-mang-cost.component.html',
  styleUrls: ['./add-traffic-mang-cost.component.css']
})
export class AddTrafficMangCostComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: AddTrafficMangCostModel;
  @Input() configModel: AddTrafficMangCostConfigModel;
  arrTMType: any[] = [
    {
      value: "Contra Flow",
      viewValue: "Contra Flow"
    },
    {
      value: "Convoy Workings",
      viewValue: "Convoy Workings"
    },
    {
      value: "Give And Take",
      viewValue: "Give And Take"
    },
    {
      value: "Lane Closure",
      viewValue: "Lane Closure"
    },
    {
      value: "Multi Way Signals",
      viewValue: "Multi Way Signals"
    },
    {
      value: "No Carriageway Incursion",
      viewValue: "No Carriageway Incursion"
    },
    {
      value: "Priority Working",
      viewValue: "Priority Working"
    },
    {
      value: "Road Closure",
      viewValue: "Road Closure"
    },
    {
      value: "Some Carriageway Incursion",
      viewValue: "Some Carriageway Incursion"
    },
    {
      value: "Stop Go Boards",
      viewValue: "Stop Go Boards"
    },
    {
      value: "Two Way Signals",
      viewValue: "Two Way Signals"
    }
  ];
  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private fb: FormBuilder,
    private _notificationService: NotificationService
    ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'tmType': ['',[Validators.required]],
      'description': ['',[Validators.required]],
      'quantity': [1,[Validators.required, Validators.min(1)]],
      'amount':['',[Validators.required]]
    });
    this.wgFormGroup.reset();
    this.wgFormGroup.markAsUntouched();
    this.wgOnInit();
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

  getValue() {
    let data: any = new Object();
    if (this.wgFormGroup.controls.tmType.value) {
      data.tmType = this.wgFormGroup.controls.tmType.value;
    }
    if (this.wgFormGroup.controls.description.value) {
      data.description = this.wgFormGroup.controls.description.value;
    }
    if (this.wgFormGroup.controls.quantity.value) {
      data.quantity = this.wgFormGroup.controls.quantity.value;
    }
    if (this.wgFormGroup.controls.amount.value) {
      data.amount = this.wgFormGroup.controls.amount.value;
    }
    return data;
  }

  addTrafficManagementCost(){
    this.wgFormGroup.markAllAsTouched();
    if (this.wgFormGroup.dirty && this.wgFormGroup.valid) {
      let data:AddTrafficMangCostDataModel = this.getValue();
      this.wgReset();
      this.createFormGroup();
      this.emitEvent("onSaveTrafficCostClick", data);
        } else {
      try {
        this._notificationService.error(this.wgFormGroup.errors.dateCompare.errorMessage)
      } catch (exception) {
      }
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }
}
