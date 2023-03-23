import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { DurationViewerChartConfigModel, DurationViewerChartDataModel } from './duration-viewer-chart.model';

@Component({
  selector: 'app-duration-viewer-chart',
  templateUrl: './duration-viewer-chart.component.html',
  styleUrls: ['./duration-viewer-chart.component.css']
})
export class DurationViewerChartComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: DurationViewerChartDataModel;
  @Input() configModel: DurationViewerChartConfigModel;
  infoData:any=new Object();
  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) { 
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
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

  oninfoclick(element){
    this.infoData.actualEndDate=element.dataInfo.actualEndDate;
    this.infoData.actualStartDate=element.dataInfo.actualStartDate;
    this.infoData.expectedEndDate=element.dataInfo.expectedEndDate;
    this.infoData.validityStartDate=element.dataInfo.validityStartDate;
    this.infoData.registrationDueDate=element.dataInfo.registrationDueDate;
  }
  
}
