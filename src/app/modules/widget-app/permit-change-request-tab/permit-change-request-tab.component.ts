import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PermitChangeReqConfigModel, PermitChangeReqDataModel, PermitChangeRequestRow, PermitChangeRequestTabModel } from './permit-change-request-tab.module';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { CreatePermitDrawMapComponent } from '../create-permit-draw-map/create-permit-draw-map.component';
import { DataHelper } from 'src/app/utility/data.helper';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-permit-change-request-tab',
  templateUrl: './permit-change-request-tab.component.html',
  styleUrls: ['./permit-change-request-tab.component.css'],
  providers: [TransformDatePipe]
})
export class PermitChangeRequestTabComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitChangeReqDataModel;
  @Input() configModel: PermitChangeReqConfigModel;

  dataSource = new MatTableDataSource<PermitChangeRequestRow>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageChangeSubscription: any;
  length: any;
  MAT_HELPER = MatTableHelper;

  _permitChangeRequestModel: PermitChangeRequestTabModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
    private _notificationService: NotificationService,
    private _validationService: ValidationService

  ) {
    super(_serverApi, _validationService);
    this._permitChangeRequestModel = new PermitChangeRequestTabModel();
  }

  // columnsToDisplay = ['CRReferenceNumber', 'WorksRefNumber', 'ChangeRequestType', 'ChangeRequestStatus', 'StatusChangeDate', 'ChangeReason', 'SubmissionDate', 'Done', 'actions'];
  columnsToDisplay = ['CRReferenceNumber', 'WorksRefNumber', 'ChangeRequestType', 'ChangeRequestStatus', 'StatusChangeDate', 'ChangeReason', 'SubmissionDate', 'actions'];

  getControlData() {
    let id = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(`/api/v1/applications/${id}/alterations`, this._permitChangeRequestModel);
  }
  convertData(response: any) //
  {
    try {
      if (response) {
        let items: PermitChangeRequestRow[] = [];
        response.forEach(element => {

          let item: any = {};

          item.applicationId = element.application_id;
          item.CRReferenceNumber = element.permit_alteration_reference_number;
          item.WorksRefNumber = element.work_reference_number;
          item.ChangeRequestType = element.alteration_type;
          item.ChangeRequestStatus = element.alteration_status;
          item.StatusChangeDate = element.alteration_submit_date;
          item.SubmissionDate = element.alteration_submit_date;
          item.ChangeReason = element.alteration_reason;
          item.alternationId = element.alteration_id;
          item.assessment_comments = element.assessment_comments;

          items.push(item);
        });

        this.dataSource = new MatTableDataSource(items);
        this.length = items.length;///TO Do get lenght from API

      }
    } catch (e) {
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

  ngOnInit()//
  {
    this.dataSource.paginator = this.paginator;
    // this.pageChangeSubscription = this.paginator.page.subscribe(() => {
    //   this._permitChangeRequestModel.pageno = this.paginator.pageIndex;
    //   this._permitChangeRequestModel.top = this.paginator.pageSize;
    //   this._permitChangeRequestModel.skip = this._permitChangeRequestModel.pageno * this._permitChangeRequestModel.top;
    //   // TODO: will update this
    //   this.wgRefreshData();
    // });

    // TODO: attach local handlers
    this.wgOnInit();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    // this.dialog.open(ViewPermitChangeRequestComponent);
    this.dialog.open(CreatePermitDrawMapComponent);
  }

  onTrackChangeReqChangesClick(rowData) {
    this.emitEvent('onTrackChangeReqChanges', rowData);
  }

  onDeleteChangeReqClick(rowData){
    this.emitEvent('onDeleteChangeReq', rowData);
  }

  onViewChangeReqClick(rowData) {
    this.emitEvent('onViewChangeReq', rowData);
  }

  onEditChangeReqClick(rowData){
    this.emitEvent('onEditChangeReq', rowData);

  }

}

//const ELEMENT_DATA1: PermitChangeRequestRow[] = [];



