import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { RatioChartDataModel, RatioChartConfigModel } from './ratio-chart.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-ratio-chart',
  templateUrl: './ratio-chart.component.html',
  styleUrls: ['./ratio-chart.component.css']
})
export class RatioChartComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: RatioChartDataModel;
  @Input() configModel: RatioChartConfigModel;

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

  getEntityWidth(index) {
    let widthInPercentage = 0;
    let totalWidthInPercentage = this.dataModel.data.entity1Count + this.dataModel.data.entity2Count;
    switch (index) {
      case 1:
        widthInPercentage = (this.dataModel.data.entity1Count / totalWidthInPercentage) * 100;
        break;

      case 2:
        widthInPercentage = (this.dataModel.data.entity2Count / totalWidthInPercentage) * 100;
        break;

      default:
        break;
    }

    return `${widthInPercentage}%`
  }

}
