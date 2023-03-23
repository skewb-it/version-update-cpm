import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { DueListConfigModel, DueListDataModel } from './due-list-widget.model';

@Component({
  selector: 'app-due-list-widget',
  templateUrl: './due-list-widget.component.html',
  styleUrls: ['./due-list-widget.component.css']
})
export class DueListWidgetComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: DueListDataModel;
  @Input() configModel: DueListConfigModel;
  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
   }

  ngOnInit(): void {
    this.wgOnInit();
    // this.dueresponse();
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


}
