import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  PCPPermitListConfigModel,
  PCPPermitListDataModel,
  PCPPermitRow,
} from './pcp-permit-list.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { FILTER_TYPE } from 'src/app/app-constants';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { WidgetEvents } from 'src/app/models/common/widget-events';

@Component({
  selector: 'app-pcp-permit-list',
  templateUrl: './pcp-permit-list.component.html',
  styleUrls: ['./pcp-permit-list.component.css'],
})
export class PcpPermitListComponent extends WidgetComponentBase {
  @Input() dataModel: PCPPermitListDataModel;
  @Input() configModel: PCPPermitListConfigModel;

  dataSource = new MatTableDataSource<PCPPermitRow>();
  expandedElement: PCPPermitRow;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageChangeSubscription: any;
  sortFieldLabel: string = '';
  length: any;
  MAT_HELPER = MatTableHelper;
  DATA_HELPER = DataHelper;
  arrWorkIdentifier: any = [];
  arrRoadCategori: any = [];
  arrPermitStatus: any[] = [];
  preapplicationid = 0;
  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit() {
    //TODO: Remove this function call during actual databind
    // this.setDummyData();

    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.pageChangeSubscription = this.paginator.page.subscribe(() => {
      this.dataModel.apireqdata.pageno = this.paginator.pageIndex;
      this.dataModel.apireqdata.top = this.paginator.pageSize;
      this.dataModel.apireqdata.skip =
        this.dataModel.apireqdata.pageno * this.dataModel.apireqdata.top;
      // TODO: will update this
      this.wgRefreshData();
    });

    // TODO: attach local handlers
    this.wgOnInit();
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => {
    //if (this.dataModel.filterType == FILTER_TYPE.QUICK_FILTER) {
    this.paginator.pageIndex = 0;
    this.dataModel.apireqdata.pageno = this.paginator.pageIndex;
    this.dataModel.apireqdata.skip = 0;
    // if (this.sort.direction) {
    //   this.dataModel.apireqdata.sortOrder = this.sort.direction.toUpperCase();
    //   switch (this.sort.active) {
    //     case "WorksType":
    //       this.sortFieldLabel = "WORK_CATEGORY";
    //       break;
    //     case "StartDate":
    //       this.sortFieldLabel = "START_DATE";
    //       break;
    //     case "EndDate":
    //       this.sortFieldLabel = "END_DATE";
    //       break;
    //     case "PermitStatus":
    //       this.sortFieldLabel = "PERMIT_STATUS";
    //       break;
    //     case "WorkStatus":
    //       this.sortFieldLabel = "WORK_STATUS";
    //       break;
    //     default:
    //       break;
    //   }
    //   this.dataModel.apireqdata.sortField = this.sortFieldLabel;
    // } else {
    //   // try {
    //   //   delete this.dataModel.apireqdata.sortOrder;
    //   //   delete this.dataModel.apireqdata.sortField;
    //   // } catch (err) {
    //   // }
    // }
    this.wgRefreshData();
    //}
    // });
  }

  getControlData() {
    // INFO: ServerAPI

    let url: string = null;
    if (this.sort.direction) {
      this.dataModel.apireqdata.sortOrder = this.sort.direction.toUpperCase();
      this.dataModel.apireqdata.sortField = this.sortFieldLabel;
    } else {
      try {
        delete this.dataModel.apireqdata.sortOrder;
        delete this.dataModel.apireqdata.sortField;
      } catch (err) {}
    }

    switch (this.dataModel.filterType) {
      case FILTER_TYPE.QUICK_FILTER:
        this.dataModel.apiDataUrl = "/api/v1/cost-penalty/cost-quick-filter";
        break;
      case FILTER_TYPE.ADVANCE_FILTER:
      case FILTER_TYPE.DYNAMIC_FILTER:
        this.dataModel.apiDataUrl = "/api/v1/cost-penalty/search";
        break;
    }

    if(this.dataModel.apireqdata.quickFilter=='_all')
    this.dataModel.apiDataUrl = "/api/v1/cost-penalty/search";

    return this.wgAPIMethodGet(
      this.dataModel.apiDataUrl,
      this.dataModel.apireqdata
    );

    // if (this.dataModel.filterType == FILTER_TYPE.ADVANCE_FILTER) {
    //   url = "/api/v1/cost-penalty/search";;
    // } else if (this.dataModel.filterType == FILTER_TYPE.QUICK_FILTER) {
    //   url = "/api/v1/cost-penalty/cost-quick-filter";
    // }
    // return this.wgAPIMethodGet(url, this.dataModel.apireqdata);

    // if (this.dataModel.journeyType != JOURNEY_TYPE.NONE) {
    //   switch (this.dataModel.journeyType) {
    //     case JOURNEY_TYPE.SSM_START:
    //       url = "/api/v1/start/permit-list";
    //       break;
    //     case JOURNEY_TYPE.SSM_STOP:
    //       url = "/api/v1/stop/permit-list";
    //       break;
    //     case JOURNEY_TYPE.SSM_REGISTER:
    //       url = "/api/v1/register/permit-list";
    //       break;
    //     case JOURNEY_TYPE.IDM_2_4:
    //       url = "/api/v1/applications";
    //       break;
    //     case JOURNEY_TYPE.IDM_VISUAL_CORING:
    //       url = "/api/v1/applications";
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // else {
    //   switch (this.dataModel.filterType) {
    //     case FILTER_TYPE.ADVANCE_FILTER:
    //       url = this.dataModel.apiUrls.advanceFilter;
    //       break;
    //     case FILTER_TYPE.QUICK_FILTER:
    //       url = this.dataModel.apiUrls.quickFilter;
    //       break;
    //     case FILTER_TYPE.DYNAMIC_FILTER:
    //       url = this.dataModel.apiUrls.dynamicFilter;
    //       break;
    //     default:
    //       break;
    //   }
    // }


  }

  convertData(response: any) {
    // let items: PCPPermitRow[] = [];

    let items: any = [];
    response.content.forEach((element) => {
      let item: any = {};
      let temp: any = [];
      item.costType = [];
      item.ApplicationId = element.application_id;
      item.PermitRefNumber = element.permit_reference_number;
      item.WorksLocationDescription = element.location_description;
      item.WorkRefNumber = element.work_reference_number;
      item.WorkOrder = element.work_order_no;

      item.WorksType = element.work_category;
      item.CostRisk = element.cost_risk;
      item.CustomerRisk = element.customer_risk;
      item.TrafficManagement = element.traffic_management_risk;
      item.CostStaus = element.cost_status;
      item.EestimatedCost = element.estimated_cost;
      item.InvoicedCost = element.invoiced_cost;
      item.costValuePaid = element.paid_cost;

      item.StartDate = element.proposed_start_date;
      item.EndDate = element.proposed_end_date;
      item.PermitStatus = element.status_value;
      item.status = element.status;
      item.WorkStatusValue = element.work_status_value;
      item.WorkStatus = element.work_status;
      item.CollaborativeWorkingFlag = element.collaborative_working_flag;
      item.WorksReferenceNumber = element.work_reference_number;

      item.costTypes = '';
      element.cost_element.forEach((data, index) => {
        let ele: any = {};
        if (index > 0) {
          item.costTypes += ', ';
          item.costTypes += data.cost_type;
        } else item.costTypes = data.cost_type;

        ele.costtype = data.cost_type;
        ele.estimated_cost = data.estimated_cost;
        ele.invoiced_cost = data.invoiced_cost;
        ele.paid_cost = data.paid_cost;
        temp.push(ele);
      });

      item.costType.push(temp);


      items.push(item);
    });
    this.dataSource = new MatTableDataSource(items);
    this.length = response.totalElements;
  }

  setFieldData() {
    this.arrWorkIdentifier = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.WORK_IDENTIFIER.toString()
    );
    this.arrRoadCategori = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.ROAD_CATEGORY.toString()
    );
    this.arrPermitStatus = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.PERMIT_STATUS.toString()
    );
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  onEditPermitIconClick(event, rowData) {
    this.stopPropagation(event);
    this.emitEvent(
      PCPPermitListConfigModel.COMP_TO_CALLER_EDIT_PERMIT,
      rowData
    );
  }

  ngOnDestroy(): void {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe();
    }
  }

  resetPagination() {
    this.paginator.pageIndex = 0;
    this.dataModel.apireqdata.pageno = this.paginator.pageIndex;
    this.dataModel.apireqdata.skip = 0;
    this.dataModel.apireqdata.top = this.paginator.pageSize;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  setDummyData() {
    let dummyData = [
      {
        permitNumber: 'A0023943700',
        workReference: '1234567890',
        address: '7, South Avenue RHYL',
        permitStatus: 'Open',
        costStatus: 'Open',
        costType: 'PC,VC,FPN',
        costValueEstimated: 130,
        costValueInvoiced: 0,
        costValuePaid: 0,
      },
      {
        permitNumber: 'A0023943700',
        workReference: '1234567890',
        address: '9, South Avenue RHYL',
        permitStatus: 'Open',
        costStatus: 'Open',
        costType: 'PC,VC,FPN',
        costValueEstimated: 130,
        costValueInvoiced: 0,
        costValuePaid: 0,
      },
      {
        permitNumber: 'A0023943700',
        workReference: '1234567890',
        address: '10, South Avenue RHYL',
        permitStatus: 'Open',
        costStatus: 'Open',
        costType: 'PC,VC,FPN',
        costValueEstimated: 130,
        costValueInvoiced: 0,
        costValuePaid: 0,
      },
    ];
    this.dataSource = new MatTableDataSource(dummyData);
  }
}
