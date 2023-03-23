import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { CountIndicatorV1DataModel, CountIndicatorV1ConfigModel } from './count-indicator-v1.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-count-indicator-v1',
  templateUrl: './count-indicator-v1.component.html',
  styleUrls: ['./count-indicator-v1.component.css']
})
export class CountIndicatorV1Component extends WidgetComponentBase implements OnInit {

  @Input() dataModel: CountIndicatorV1DataModel;
  @Input() configModel: CountIndicatorV1ConfigModel;

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

  getSplittedText(text) {
    console.log('Splitter', text.split(" ").join("\n"))
    return text.split(" ").join("\n");
  }

}
