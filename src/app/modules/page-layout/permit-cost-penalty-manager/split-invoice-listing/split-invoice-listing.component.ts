import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  PCPPermitQuickFilterConfigModel,
  PCPPermitQuickFilterDataModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/pcp-quick-filter/permit-quick-filter.model';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { EventActionService } from 'src/app/services/event-action.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';
import {
  FormModeConstant,
  WidgetConstants,
} from 'src/app/constants/widget-constants';
import {
  FILTER_TYPE,
  GLOBAL_PARAM_KEY,
  NAVIGATION_DATA,
} from 'src/app/app-constants';
import { SidebarComponent } from 'src/app/modules/shared/sidebar/sidebar.component';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  PCPFilterDataModel,
  PCPFilterConfigModel,
} from '../../../widget-app/cost-penalty-manager/pcp-filter/pcp-filter.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import {
  MASTER_DATA,
  MASTER_DATA_DOMAIN,
  PERMIT_ACTIONS_CONFIG,
} from 'src/app/constants/db.constants';
import { PcpFilterComponent } from '../../../widget-app/cost-penalty-manager/pcp-filter/pcp-filter.component';
import {
  GLOBAL_PERSISTANT_DATA,
  PRODUCT_SERVICES,
} from 'src/app/constants/app-repo.constants';
import { AppFilterModel } from 'src/app/models/common/app-filter';
import { PcpQuickFilterComponent } from '../../../widget-app/cost-penalty-manager/pcp-quick-filter/pcp-quick-filter.component';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { PermitNavigationDataModel } from './split-invoice-listing.model';
import { SplitInvoicesListComponent } from 'src/app/modules/widget-app/cost-penalty-manager/split-invoices-list/split-invoices-list.component';
import {
  SplitInvoicesListConfigModel,
  SplitInvoicesListDataModel,
  SplitInvoicesListRequestModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/split-invoices-list/split-invoices-list.model';

@Component({
  selector: 'app-split-invoice-listing',
  templateUrl: './split-invoice-listing.component.html',
  styleUrls: ['./split-invoice-listing.component.css'],
})
export class SplitInvoiceListingComponent
  extends WidgetPageBase
  implements OnInit
{
  @ViewChild(SidebarComponent)
  sidebarComponent: SidebarComponent;

  @ViewChild(SplitInvoicesListComponent)
  SplitInvoicesListComponent: SplitInvoicesListComponent;

  @ViewChild(PcpFilterComponent)
  pcpFilterComponent: PcpFilterComponent;

  @ViewChild(PcpQuickFilterComponent)
  pcpQuickFilterComponent: PcpQuickFilterComponent;

  @ViewChild(DialogComponent)
  dialogComponent: DialogComponent;

  createChargeForm: FormGroup;

  pcpPermitQuickFilterDataModel: PCPPermitQuickFilterDataModel;
  pcpPermitQuickFilterConfigModel: PCPPermitQuickFilterConfigModel;

  pcpFilterDataModel: PCPFilterDataModel;
  pcpFilterConfigModel: PCPFilterConfigModel;

  splitInvoicesListDataModel: SplitInvoicesListDataModel;
  splitInvoicesListConfigModel: SplitInvoicesListConfigModel;

  dialogModel: DialogModel = new DialogModel();

  filterhide: boolean = true;
  searchInput: FormControl = new FormControl('');
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;

  arrChargeType: any[] = [];
  arrHighwayAuthority: any[] = [];

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _eventActionServiceBase: EventActionService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private fb: FormBuilder,
    private _spinner: NgxSpinnerService,
    private _appRepoService: AppRepoService,
    private _appRepoHelperService: AppRepoHelperService,
    private _serverApiBase: ServerApiInterfaceServiceService
  ) {
    super(
      _serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner
    );
    this.splitInvoicesListDataModel = SplitInvoicesListDataModel.getInstance();
    this.splitInvoicesListConfigModel =
      SplitInvoicesListConfigModel.getInstance();
    this.pcpPermitQuickFilterDataModel =
      PCPPermitQuickFilterDataModel.getInstance();
    this.pcpPermitQuickFilterConfigModel =
      PCPPermitQuickFilterConfigModel.getInstance();

    this.pcpFilterDataModel = PCPFilterDataModel.getInstance();
    this.pcpFilterConfigModel = PCPFilterConfigModel.getInstance();
  }
  ngOnInit(): void {
    this.bindPCPPermitQuickFilterDataModel();
    this.bindPCPPermitQuickFilterEvents();

    this.bindSplitInvoicesListDataModel();
    this.bindSplitInvoicesListEvents();

    this.bindPCPFilterDataModel();
    this.bindPCPFilterEvents();
  }
  ngAfterViewInit() {
    this.setComponentRefMap();
    this.checkJourney();
  }
  setComponentRefMap() {
    this.compRefInstancesMap.set('permitList', this.SplitInvoicesListComponent);
    this.compRefInstancesMap.set('permitFilter', this.pcpFilterComponent);
    this.compRefInstancesMap.set(
      'permitQuickFilter',
      this.pcpQuickFilterComponent
    );
    // this.compRefInstancesMap.set(
    //   'globalFilterComponent',
    //   this.globalFilterComponent
    // );
  }
  checkJourney() {
    if (
      this._appRepoService.appRepo.appProductCode ==
        PRODUCT_SERVICES.START_STOP_REGISTER_MANAGER_PRODUCT_CODE ||
      this._appRepoService.appRepo.appProductCode ==
        PRODUCT_SERVICES.INSPECTIONS_AND_DEFECTS_MANAGER_PRODUCT_CODE
    ) {
      let journeyType =
        this._appRepoService.appRepo.appGlobalPersistantData.get(
          GLOBAL_PERSISTANT_DATA.JOURNEY
        );
      if (journeyType != null) {
        this.checkAndBindJourney(journeyType);
      } else {
        this.checkAndBindDynamicFilterData(false);
      }
    } else {
      this.checkAndBindDynamicFilterData(false);
    }
  }

  checkAndBindJourney(journeyType) {
    this.splitInvoicesListDataModel.apireqdata =
      new SplitInvoicesListRequestModel();
    this.splitInvoicesListDataModel.journeyType = journeyType;
    this.SplitInvoicesListComponent.resetPagination();
    this.checkAndBindDynamicFilterData(true);
  }

  checkAndBindDynamicFilterData(shouldCompulsoryRefreshList) {
    let filterGlobalPersistData: AppFilterModel =
      this._appRepoService.appRepo.appGlobalPersistantData.get(
        GLOBAL_PARAM_KEY.APP_FILTER
      );
    if (
      filterGlobalPersistData.persistantfilterType == FILTER_TYPE.DYNAMIC_FILTER
    ) {
      this.splitInvoicesListDataModel.apireqdata =
        new SplitInvoicesListRequestModel();
      this.splitInvoicesListDataModel.filterType = FILTER_TYPE.DYNAMIC_FILTER;
      this.splitInvoicesListDataModel.apireqdata = {
        ...filterGlobalPersistData.persistantDynamicFilterModel,
      };
      this.SplitInvoicesListComponent.resetPagination();
      this.splitInvoicesListConfigModel.CallerToComp.emit(
        WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
      );
    } else if (shouldCompulsoryRefreshList) {
      this.splitInvoicesListConfigModel.CallerToComp.emit(
        WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
      );
    }
  }

  onSidebarClosed() {
    // alert("closed")
    this.filterhide = true;
    // this.filterhideshow();
  }
  filterhideshow() {
    this.filterhide = !this.filterhide;
    // this.filterhide=false;

    // if(this.filterhide){
    this.sidebarComponent.display = true;
    // }
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  openDialog() {
    this.resetPermitNavigationData();
    this.dialogModel.maximizable = true;
    this.dialogModel.header = 'Manually Add Charge';
    this.dialogModel.visible = true;
  }
  // toggleList(index: number) {
  //   this.activeLink = index;
  // }
  bindPCPPermitQuickFilterDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.pcpPermitQuickFilterDataModel);
    this.pcpPermitQuickFilterDataModel.quickFilters = [
      {
        filterValue: '_all',
        label: 'Draft SplitInvoices',
        count: 0,
        icon: '',
        helperTitle: 'All',
      },
      {
        filterValue: 'FPN',
        label: 'Split SplitInvoices',
        count: 0,
        icon: '',
        helperTitle: 'FPN',
      },
      {
        filterValue: 'Section74',
        label: 'S74',
        count: 0,
        icon: '',
        helperTitle: 'Section 74s',
      },
      {
        filterValue: 'Defects',
        label: 'Partially Reconciled',
        count: 0,
        icon: '',
        helperTitle: 'Defects',
      },
      {
        filterValue: 'To_Do',
        label: 'Fully Reconciled',
        count: 0,
        icon: '',
        helperTitle: 'To Do',
      },
      {
        filterValue: 'Planning',
        label: 'Final SplitInvoices',
        count: 0,
        icon: '',
        helperTitle: 'Planning',
      },
      {
        filterValue: 'PAA_Follow_Up',
        label: 'PO Submitted',
        count: 0,
        icon: '',
        helperTitle: 'Paa Follow Up',
      },
      {
        filterValue: 'Awaiting_Grant',
        label: 'Rejected',
        count: 0,
        icon: '',
        helperTitle: 'Awaiting Grant',
      },
      // {
      //   filterValue: 'Awaiting_Work_Start',
      //   label: 'Awaiting Work Start',
      //   count: 0,
      //   icon: '',
      //   helperTitle: 'Awating Work Start',
      // },
      // {
      //   filterValue: 'In_Progress',
      //   label: 'In Progress',
      //   count: 0,
      //   icon: '',
      //   helperTitle: 'In Progress',
      // },
      // {
      //   filterValue: 'Awaiting_Work_Stop',
      //   label: 'Awaiting Work Stop',
      //   count: 0,
      //   icon: '',
      //   helperTitle: 'Awaiting Work Stop',
      // },
      // {
      //   filterValue: 'Registration_Due',
      //   label: 'Registration Due',
      //   count: 0,
      //   icon: '',
      //   helperTitle: 'Registration Due',
      // },
      // {
      //   filterValue: 'Interim_To_Perm',
      //   label: 'Interim to Permanent',
      //   count: 0,
      //   icon: '',
      //   helperTitle: 'Interim To Permanent',
      // },
    ];
  }

  bindPCPPermitQuickFilterEvents() {
    let eventActions: any = [
      [
        WidgetConstants.APPLY_FILTER,
        [
          {
            action: 'applyFilterOnChange',
            params: [
              {
                'page.filterposition': "'permitQuickFilter'",
                'page.gridposition': "'permitList'",
                'page.clearFilter': "'permitFilter'",
                'targ.filterType': FILTER_TYPE.QUICK_FILTER,
              },
              // {
              //   methodname: 'onSidebarClosed',
              // },
            ],
          },
        ],
      ],
    ];
    super.addEventListener(
      eventActions,
      this.pcpPermitQuickFilterDataModel,
      this.pcpPermitQuickFilterConfigModel
    );
  }

  bindPCPFilterDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.splitInvoicesListDataModel);
  }

  bindPCPFilterEvents() {
    let eventActions: any = [
      [
        WidgetConstants.APPLY_FILTER,
        [
          {
            action: 'applyFilterOnChange',
            params: [
              {
                'page.filterposition': "'permitFilter'",
                'page.gridposition': "'permitList'",
                'page.clearFilter': "'permitQuickFilter'",
                'targ.filterType': FILTER_TYPE.ADVANCE_FILTER,
              },
            ],
          },
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'onfilterrest',
              },
            ],
          },
        ],
      ],
    ];
    super.addEventListener(
      eventActions,
      this.pcpFilterDataModel,
      this.pcpFilterConfigModel
    );
  }
  bindSplitInvoicesListDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.splitInvoicesListDataModel);
    this.splitInvoicesListDataModel.columnsToDisplay = [
      'CollaborativeWorkingFlag',
      'PermitRefNumber',
      'WorksLocationDescription',
      // 'DeemedDate',
      'WorksType',
      'CostRisk',
      'CustomerRisk',
      'TrafficManagement',
      'StartDate',
      'EndDate',
      'DeemedDate',
      'PermitStatus',
      'WorkStatus',
      'AlterationStatus',
      'tag_matrix',
    ];
    this.splitInvoicesListDataModel.apiUrls.advanceFilter =
      '/api/v1/applications';
    this.splitInvoicesListDataModel.apiUrls.quickFilter =
      '/api/v1/applications/quick-filter';
    this.splitInvoicesListDataModel.apiUrls.dynamicFilter =
      '/api/v1/applications';
  }

  bindSplitInvoicesListEvents() {
    let eventActions: any = [
      [
        'viewClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_viewClick',
              },
            ],
          },
          // {
          //   "action": "navigate1",
          //   "params": {
          //     "staticKeys": [
          //     ],
          //     "eventParamKeys": [
          //       {
          //         "getKey": "ApplicationId",
          //         "setKey": "applicationId"
          //       },
          //       {
          //         "getKey": "PermitRefNumber",
          //         "setKey": "permitRefNumber"
          //       }
          //     ],
          //     "globalParamKeys": [
          //       "applicationId"
          //     ],
          //     "location": {
          //       "path": "/admin/permit-view"
          //     }
          //   },
          //   "eventParamKeys": ""
          // }
        ],
      ],

      [
        'inActivePermitView',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_inActivePermitView',
              },
            ],
          },
        ],
      ],
      [
        'editPermit',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_openEditPermitDialog',
              },
            ],
          },
        ],
      ],
      [
        'deletePermit',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onDelete',
              },
            ],
          },
        ],
      ],
    ];

    super.addEventListener(
      eventActions,
      this.splitInvoicesListDataModel,
      this.splitInvoicesListConfigModel
    );
  }
  page_openEditPermitDialog(eventparams, wigDataContext, params) {
    this.globalParameters.set('applicationId', null);
    // this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
    let applicationId = eventparams.dataContext.ApplicationId;
    this.resetPermitNavigationData();
    // this.setPermitNavigationKey(FormModeConstant.EDIT);

    // this.isCreatePermitModeCreate = false;

    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);

    this.showSpinner();
    this._serverApiBase
      .get<any>(`/api/v1/applications/${applicationId}`)
      .subscribe(
        (response) => {
          try {
            this.hideSpinner();
            if (response) {
              console.log('check response', response);

              // let permitresponse: PermitNavigationDataModel =
              //   this.convertPermitDetailsResponse(response);

              // this.globalParameters.set(
              //   GLOBAL_PARAM_KEY.ELGIN_MAP,
              //   permitresponse.mapPageData
              // );
              // this.globalParameters.set(
              //   GLOBAL_PARAM_KEY.CONDITIONS,
              //   permitresponse.conditionPageData
              // );
              // this.globalParameters.set(
              //   GLOBAL_PARAM_KEY.PERMIT_FORM,
              //   permitresponse.permitFormPageData
              // );

              // this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
              // this.permitDrawMapDataModel.mode = FormModeConstant.EDIT;
              // this.permitConditionsDataModel.mode = FormModeConstant.EDIT;
              // this.globalParameters.set('applicationId', applicationId);
              // this.dialogModel = new DialogModel();
              // this.dialogModel.width = '80%';
              // // this.createPermitStepNo = 1;
              // this.dialogModel.maximizable = true;

              // this.dialogModel.header =
              //   this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

              // // set eleginMap Mode
              // this.elginMapDataModel.mode = FormModeConstant.EDIT;
              // this.elginMapDataModel.isSelfDataLoad = true;

              // this.elginMapDataModel.globalParameters.set(
              //   GLOBAL_PARAM_KEY.ELGIN_MAP,
              //   this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP)
              // );

              // this.permitDrawMapDataModel.globalParameters.set(
              //   GLOBAL_PARAM_KEY.ELGIN_MAP,
              //   this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP)
              // );
              // this.permitDrawMapDataModel.globalParameters.set(
              //   GLOBAL_PARAM_KEY.PERMIT_FORM,
              //   this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM)
              // );

              this.dialogModel.visible = true;
            }
          } catch (e) {
            this.hideSpinner();
          }
        },
        (error) => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );
  }

  resetPermitNavigationData() {
    this._appRepoHelperService.setNavigationData(
      NAVIGATION_DATA.CREATE_PERMIT,
      {}
    );
    this._appRepoHelperService.setNavigationData(
      NAVIGATION_DATA.EDIT_PERMIT,
      {}
    );
  }
  onfilterrest() {
    this.filterhide = true;
  }
  onCancelCreateChargeForm() {
    this.createChargeForm.reset();

    this.dialogModel.visible = false;
  }
  onSaveCreateChargeForm() {
    console.log(this.createChargeForm.value);
    this.dialogModel.visible = false;
    this.createChargeForm.reset();
  }
  page_inActivePermitView(eventparams, wigDataContext, params) {
    this.globalParameters.set('applicationId', null);
    let applicationId = eventparams.dataContext.ApplicationId;
    this.showSpinner();
    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      (response) => {
        try {
          this.hideSpinner();
          if (response) {
            //   let permitresponse: PermitNavigationDataModel =
            //     this.convertPermitDetailsResponse(response);
            //   this.globalParameters.set(
            //     GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP,
            //     permitresponse.mapPageData
            //   );
            //   this.globalParameters.set(
            //     GLOBAL_PARAM_KEY.VIEW_CONDITIONS,
            //     permitresponse.conditionPageData
            //   );
            //   this.globalParameters.set(
            //     GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
            //     response
            //   );
            //   // this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, response);
            //   // console.log("at view button click",this.permitDrawMapDataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
            //   this.globalParameters.set('applicationId', applicationId);
            //   this.globalParameters.set('inActivePermitView', true);
            //   let navigationData = new Map<string, object>();
            //   navigationData.set(
            //     'inActivePermitView',
            //     this.globalParameters.get('inActivePermitView')
            //   );
            //   navigationData.set(
            //     'applicationId',
            //     this.globalParameters.get('applicationId')
            //   );
            //   navigationData.set(
            //     GLOBAL_PARAM_KEY.ELGIN_MAP,
            //     this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP)
            //   );
            //   navigationData.set(
            //     GLOBAL_PARAM_KEY.CONDITIONS,
            //     this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_CONDITIONS)
            //   );
            //   navigationData.set(
            //     GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
            //     this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            //   );
            //   this._sessionStorageService.setNavigationData(navigationData);
            //   this._router.navigate(['/admin/permit-view']);
          }
        } catch (e) {
          this.hideSpinner();
        }
      },
      (error) => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    );
  }
  convertPermitDetailsResponse(response: any) {
    let permitNavigationDataModel = new PermitNavigationDataModel();
    if (!response) {
      return permitNavigationDataModel;
    }
    // permitNavigationDataModel.mapPageData = this.convertToMapPageData(response);
    // //set conditionPageData
    // permitNavigationDataModel.conditionPageData =
    //   this.convertToConditionPageData(response);
    // //set permitFormPageData
    // permitNavigationDataModel.permitFormPageData =
    // this.convertToPermitForm(response);
    let userInfo: any = this._appRepoHelperService.getMDataByKey(
      MASTER_DATA.USER_INFO
    );
    // user Info
    // permitNavigationDataModel.permitFormPageData.orgId = userInfo.org_id;
    // permitNavigationDataModel.permitFormPageData.departmentId = userInfo.department_id;
    return permitNavigationDataModel;
  }

  setFieldData() {
    this.arrChargeType = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.WORK_CATEGORY.toString()
    );
    // this.arrStatus = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.WORK_STATUS.toString()
    // );
    // this.arrPermitStatus = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.PERMIT_STATUS.toString()
    // );
    // this.arrRoadCategory = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.ROAD_CATEGORY.toString()
    // );
    // this.arrCloseFootway = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.CLOSE_FOOTWAY.toString()
    // );
    // this.arrLiabilityOwner = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.TRAFFIC_MANAGEMENT_TYPE.toString()
    // );
    this.arrHighwayAuthority = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString()
    );
    // let allArrWorkstreams: any =
    //   this._appRepoHelperService.getUserAccessibleWorkStream();

    // this.arrWorkstreams = allArrWorkstreams.filter((thing, i, arr) => {
    //   return (
    //     arr.indexOf(arr.find((t) => t.workstreamId === thing.workstreamId)) ===
    //     i
    //   );
    // });
  }

  page_viewClick(eventparams, wigDataContext, params) {
    this.globalParameters.set('applicationId', null);
    let applicationId = eventparams.dataContext.ApplicationId;

    this.showSpinner();
    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      (response) => {
        try {
          this.hideSpinner();
          if (response) {
            let permitresponse: PermitNavigationDataModel =
              this.convertPermitDetailsResponse(response);

            this.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP,
              permitresponse.mapPageData
            );
            this.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_CONDITIONS,
              permitresponse.conditionPageData
            );
            this.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              response
            );
            //   // this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, response);

            //   // console.log("at view button click",this.permitDrawMapDataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
            this.globalParameters.set('applicationId', applicationId);
            this.globalParameters.set('inActivePermitView', false);

            let navigationData = new Map<string, object>();

            navigationData.set(
              'inActivePermitView',
              this.globalParameters.get('inActivePermitView')
            );

            navigationData.set(
              'applicationId',
              this.globalParameters.get('applicationId')
            );

            navigationData.set(
              GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP)
            );

            navigationData.set(
              GLOBAL_PARAM_KEY.CONDITIONS,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_CONDITIONS)
            );

            navigationData.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );
            console.log(
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );
            this._sessionStorageService.setNavigationData(navigationData);
            this._router.navigate(['/admin/invoice-view']);
          }
        } catch (e) {
          this.hideSpinner();
        }
      },
      (error) => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    );
  }
}
