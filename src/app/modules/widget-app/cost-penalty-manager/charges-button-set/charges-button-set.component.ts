import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import {
  ChargesButtonConfigModel,
  ChargesButtonModel,
} from './charges-button-set.model';

@Component({
  selector: 'app-charges-button-set',
  templateUrl: './charges-button-set.component.html',
  styleUrls: ['./charges-button-set.component.css'],
})
export class ChargesButtonSetComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: ChargesButtonModel;
  @Input() configModel: ChargesButtonConfigModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private _saveFileService: SaveFileService,

    public dialog: MatDialog
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    super.wgOnInit();
  }
  setFieldData() {}

  setMode(responseDataModel: any) {}
  setValue(responseDataModel: any) {}
  getControlData() {}

  convertData(response: any) {}

  eventEmmiter(event: string) {
    this.emitEvent(event);
  }
}
