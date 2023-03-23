import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateReinstatementComponent } from '../create-reinstatement/create-reinstatement.component';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidationService } from 'src/app/services/validation.service';
import { PermitReinstatementConfigModel, PermitReinstatementDataModel, PermitReinstatementResRow } from './permit-reinstatement-tab-modele';
import { SiteDetailsComponent } from '../site-details/site-details.component';
import { element } from 'protractor';
import { DataHelper } from 'src/app/utility/data.helper';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';

@Component({
  selector: 'app-permit-reinstatement-tab',
  templateUrl: './permit-reinstatement-tab.component.html',
  styleUrls: ['./permit-reinstatement-tab.component.css'],
  providers: [TransformDatePipe]
})
export class PermitReinstatementTabComponent extends WidgetComponentBase implements OnInit {
  columnsToDisplay = ['SiteNumber', 'Description', 'Dimentions', 'ReinstatementDate', 'ExpiryDate', 'ReinstatementStatus','Actions'];
  dataSource = new MatTableDataSource<PermitReinstatementResRow>();
  length: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() dataModel: PermitReinstatementDataModel;
  @Input() configModel: PermitReinstatementConfigModel;
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;
  siteDetailsData;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
    private _notificationService: NotificationService,
    private _validationService: ValidationService,
    private _appRepoService: AppRepoService,
    ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    this.dialog.open(CreateReinstatementComponent);
  }

  getControlData() {
    let id = `${this.dataModel.globalParameters.get('applicationId')}`;
    return this.wgAPIMethodGet(`/api/v1/applications/${id}/sites`);
  }

  showDeleteIcon:boolean = false;
  convertData(response: any){

    try {
      if (response) {
        this.siteDetailsData = response;
        let items: PermitReinstatementResRow[] = [];
        response.forEach(element => {
          let item: any = {};
          item.SiteId = element.site_id;
          item.SiteNumber = element.site_number;
          item.Description = element.location_description;
          item.Dimentions = ' W '+element.width+' L '+element.length+' D '+element.depth;
          item.ReinstatementDate = element.reinstatement_date;
          item.ExpiryDate = element.expiry_date;
          item.ReinstatementStatus = this._appRepoHelperService.getMDataDisplayTextByValue(element.reinstatement_status);
          item.reinstatement_coordinates = element.reinstatement_coordinates;
          item.version = element.version;
          items.push(item);

        });
        this.dataSource = new MatTableDataSource(items);
        this.length = items.length;///TO Do get lenght from API
      }
    } catch (e) {
    }

  }


  checkEditPermitEnable(actionName,row)
  {
    if (this._appRepoHelperService.hasPermitActionPermission(actionName)){
      if ('version' in row) {
        if (row.version=='Draft')
        {
           return true;
        }
        else
        {
           return false;
        }
      }
    }
  }



  setFieldData() {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  applyFilter(filterValue: string) {

  }

  editReinstatement(row){
    this.emitEvent(PermitReinstatementConfigModel.COMP_TO_CALLER_EDIT_REINSTATEMENT, row);
  }


  viewSiteDetails(row){
    this.emitEvent(PermitReinstatementConfigModel.COMP_TO_CALLER_VIEW_SITE_DETAILS , row);
  }

  deleteReinstatement(row){

    this.emitEvent('onDeleteReinstatement', row);
    this.emitEvent(PermitReinstatementConfigModel.COMP_TO_CALLER_DELETE_REINSTATEMENT , row);
  }

}

