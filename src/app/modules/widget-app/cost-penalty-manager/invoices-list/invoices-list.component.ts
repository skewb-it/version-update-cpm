import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AppList,
  InvoicesListConfigModel,
  InvoicesListDataModel,
  InvoicesRow,
} from './invoices-list.model';
import { FILTER_TYPE, JOURNEY_TYPE } from 'src/app/app-constants';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { CreatePermitDialogData } from 'src/app/models/dialog/create-permit-dialog-data';

import { DIALOG_MODE_UPDATE } from 'src/app/models/dialog/dialog-mode';
import { DataHelper } from 'src/app/utility/data.helper';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { WidgetEvents } from 'src/app/models/common/widget-events';
@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class InvoicesListComponent extends WidgetComponentBase {
  @Input() dataModel: InvoicesListDataModel;
  @Input() configModel: InvoicesListConfigModel;
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;
  dataSource = new MatTableDataSource<InvoicesRow>();
  expandedElement: InvoicesRow;
  inactiveAppList: AppList[] = [];

  // color-code:any="red";
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
    private _validationService: ValidationService,
    private _appRepoService: AppRepoService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit() {
    // console.log('InvoicesListComponent ngOnInit');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    //     case 'WorksType':
    //       this.sortFieldLabel = 'WORK_CATEGORY';
    //       break;
    //     case 'StartDate':
    //       this.sortFieldLabel = 'START_DATE';
    //       break;
    //     case 'EndDate':
    //       this.sortFieldLabel = 'END_DATE';
    //       break;
    //     case 'PermitStatus':
    //       this.sortFieldLabel = 'PERMIT_STATUS';
    //       break;
    //     case 'WorkStatus':
    //       this.sortFieldLabel = 'WORK_STATUS';
    //       break;
    //     case 'DeemedDate':
    //       this.sortFieldLabel = 'DEEMED_DATE';
    //       break;
    //     default:
    //       break;
    //   }
    //   this.dataModel.apireqdata.sortField = this.sortFieldLabel;
    // } else {
    // try {
    //   delete this.dataModel.apireqdata.sortOrder;
    //   delete this.dataModel.apireqdata.sortField;
    // } catch (err) {
    // }
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

    if (this.dataModel.journeyType != JOURNEY_TYPE.NONE) {
      switch (this.dataModel.journeyType) {
        case JOURNEY_TYPE.SSM_START:
          url = '/api/v1/start/permit-list';
          break;
        case JOURNEY_TYPE.SSM_STOP:
          url = '/api/v1/stop/permit-list';
          break;
        case JOURNEY_TYPE.SSM_REGISTER:
          url = '/api/v1/register/permit-list';
          break;
        case JOURNEY_TYPE.IDM_2_4:
          url = '/api/v1/applications';
          break;
        case JOURNEY_TYPE.IDM_VISUAL_CORING:
          url = '/api/v1/applications';
          break;
        default:
          break;
      }
    } else {
      switch (this.dataModel.filterType) {
        case FILTER_TYPE.ADVANCE_FILTER:
          url = this.dataModel.apiUrls.advanceFilter;
          break;
        case FILTER_TYPE.QUICK_FILTER:
          url = this.dataModel.apiUrls.quickFilter;
          break;
        case FILTER_TYPE.DYNAMIC_FILTER:
          url = this.dataModel.apiUrls.dynamicFilter;
          break;
        default:
          break;
      }
    }
    console.log('url from Invoiceslist', url);
    return this.wgAPIMethodGet(url, this.dataModel.apireqdata);
  }

  convertData(response: any) {
    let items: InvoicesRow[] = [];
    response.content.forEach((element) => {
      let item: any = {};

      item.ApplicationId = element.application_id;
      item.PermitRefNumber = element.permit_reference_number;
      item.WorksLocationDescription = element.location_description;

      item.WorkOrder = element.work_order_no;

      item.WorksType = element.work_category;
      item.CostRisk = element.cost_risk;
      item.CustomerRisk = element.customer_risk;
      item.TrafficManagement = element.traffic_management_risk;
      item.DeemedDate = element.deadline_date;
      item.StartDate = element.start_date;
      item.EndDate = element.end_date;
      item.PermitStatus = element.status_value;
      item.status = element.status;
      item.WorkStatusValue = element.work_status_value;
      item.WorkStatus = element.work_status;
      item.CollaborativeWorkingFlag = element.collaborative_working_flag;
      item.WorksReferenceNumber = element.work_reference_number;
      item.tag_matrix = element.tag_matrix;
      item.alteration_status = element.alteration_status;
      let temp: AppList[] = [];

      // element.inactive_app_list.forEach(element1 => {
      //  let item1: any = {};
      //     item1.appId= element1.application_id;
      //     item1.permitRefNo= element1.permit_reference_number;
      //     item1.applistStatus= element1.status;
      //     temp.push(item1);

      // });

      // this.inactiveAppList =temp;

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

  applyFilter(filterValue: string) {
    // if (filterValue == "all") {
    //   this.dataSource.filter = "";
    // } else {
    //   filterValue = filterValue.trim();
    //   filterValue = filterValue.toLowerCase();
    //   this.dataSource.filter = filterValue;
    // }
  }

  onExpandCollapse(element) {
    if (element.ApplicationId != this.preapplicationid) {
      this.preapplicationid = element.ApplicationId;
      this.expandedElement = element;
      return this.getApplicationsDetails(element);
    }
  }

  getApplicationsDetails(element) {
    super
      .wgAPIMethodGet(`/api/v1/applications/${element.ApplicationId}`, null)
      .then((response: any) => {
        if (response) {
          element.inactive_app_list = [];
          element.WorksReferenceNumber = response.work_reference_number;
          element.HighwayAuthority = response.highway_authority_name;
          element.Workstream = response.department_name;
          element.PromoterPrefix = response.promoter_prefix;
          element.PromoterOrganization = response.promoter_organisation;
          element.ProjectReferenceNumber = response.project_reference_number;
          element.Contact = response.secondary_contact;
          // not pressent in api response
          element.ProposedDuration = response.working_days;
          element.Cost = response.total_cost;

          //  element.RoadType = this._appRepoHelperService.getMDataDisplayTextByValue(element.road_category.toString());
          element.TrafficSensitive = response.traffic_sensitive_flag;
          element.FootwayClosure = response.close_footway;

          element.ExcavationRequired = response.excavation_flag;
          element.IsLaneRentalApplicable = response.lane_rental_flag;
          element.TrafficManagementRequired = response.traffic_management_type;
          element.WorkDescription = response.work_description;

          // this.arrWorkIdentifier.forEach(element1 => {
          //   if (element1.workIdentifierId == response.work_description) {
          //     element.WorkDescription = element1.description;
          //   }
          // });

          this.arrRoadCategori.forEach((element1) => {
            if (element1.value == response.road_category) {
              element.RoadType = element1.displayText;
            }
          });

          response.inactive_app_list.forEach((element11) => {
            let item1: any = {};
            item1.ApplicationId = element11.application_id;
            item1.permitRefNo = element11.permit_reference_number;
            item1.applistStatus = element11.status;

            element.inactive_app_list.push(item1);
          });

          // this.inactiveAppList =temp;

          // element.inactive_app_list = this.inactiveAppList;

          element.FootwayClosureDisplayText =
            this._appRepoHelperService.getMDataDisplayTextByValue(
              element.FootwayClosure
            );
          element.TrafficManagReqDisplayText =
            this._appRepoHelperService.getMDataDisplayTextByValue(
              element.TrafficManagementRequired
            );
        }
      });
  }
  checkEditPermitEnable(actionName, row) {
    // if (this._appRepoHelperService.hasPermitActionPermission(actionName)) {
    if ('status' in row) {
      if (row.status == 'draft') {
        return true;
      } else {
        return false;
      }
    }
    // }
  }

  onViewClick(row) {
    this.emitEvent(WidgetEvents.VIEW_CLICK, row);
  }

  onInactivePermitViewClick(row) {
    this.emitEvent('inActivePermitView', row);
  }

  onEditPermitIconClick($event, rowData) {
    $event.stopPropagation();
    this.emitEvent('editPermit', rowData);
  }

  onDeletePermitIconClick($event, rowData) {
    $event.stopPropagation();
    this.emitEvent('deletePermit', rowData);
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

  getHelpTextData(data) {
    // switch (data) {
    //   case 'CostRisk':
    //     return 1001;
    //     case 'CustomerRisk':
    //     return 1002;
    //     case 'TrafficManagement':
    //     return 1003;
    //   default:
    //     return null;
    // }
    return null;
  }
}
