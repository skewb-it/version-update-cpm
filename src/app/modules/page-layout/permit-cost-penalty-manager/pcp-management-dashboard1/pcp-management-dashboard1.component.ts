import { AppFilterModel, PersistantDynamicFilterModel } from 'src/app/models/common/app-filter';
import { Component, OnInit } from '@angular/core';
import { CountIndicatorV1ConfigModel, CountIndicatorV1DataModel } from 'src/app/modules/widget/count-indicator/count-indicator-v1/count-indicator-v1.model';
import { DashboardSelectsConfigModel, DashboardSelectsDataModel } from 'src/app/modules/widget/dashboard-selects/dashboard-selects.model';
import { FILTER_TYPE, GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { MatrixA2ConfigModel, MatrixA2Model } from 'src/app/modules/widget/matrix/matrix-a2/matrix-a2-model';
import { MatrixConfigModel, MatrixModel } from 'src/app/modules/widget/matrix/matrix/matrix.model';
import { PotentialCostCardConfigModel, PotentialCostCardDataModel } from 'src/app/modules/widget/card/potential-cost-card/potential-cost-card.model';
import { StepperCostConfigModel, StepperCostDataModel, StepperCostfilterModel } from 'src/app/modules/widget/stepper/stepper-cost/stepper-cost.model';

import { AppRepoService } from 'src/app/services/app-repo.service';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import { EventActionService } from 'src/app/services/event-action.service';
import { MANAGEMENT_DB_MATRIX_FILTER } from 'src/app/constants/db.constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { WidgetConstants } from 'src/app/constants/widget-constants';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-pcp-management-dashboard1',
  templateUrl: './pcp-management-dashboard1.component.html',
  styleUrls: ['./pcp-management-dashboard1.component.css']
})
export class PcpManagementDashboard1Component extends WidgetPageBase implements OnInit {

  dashboardSelectsDataModel: DashboardSelectsDataModel;
  dashboardSelectsConfigModel: DashboardSelectsConfigModel;

  countIndicatorV11DataModel: CountIndicatorV1DataModel;
  countIndicatorV11ConfigModel: CountIndicatorV1ConfigModel;

  countIndicatorV12DataModel: CountIndicatorV1DataModel;
  countIndicatorV12ConfigModel: CountIndicatorV1ConfigModel;

  countIndicatorV13DataModel: CountIndicatorV1DataModel;
  countIndicatorV13ConfigModel: CountIndicatorV1ConfigModel;

  countIndicatorV14DataModel: CountIndicatorV1DataModel;
  countIndicatorV14ConfigModel: CountIndicatorV1ConfigModel;

  stepperCost1DataModel: StepperCostDataModel;
  stepperCost1ConfigModel: StepperCostConfigModel;

  stepperCost2DataModel: StepperCostDataModel;
  stepperCost2ConfigModel: StepperCostConfigModel;

  stepperCost3DataModel: StepperCostDataModel;
  stepperCost3ConfigModel: StepperCostConfigModel;

  stepperCost4DataModel: StepperCostDataModel;
  stepperCost4ConfigModel: StepperCostConfigModel;

  potentialCostCard1DataModel: PotentialCostCardDataModel;
  potentialCostCard1ConfigModel: PotentialCostCardConfigModel;

  potentialCostCard2DataModel: PotentialCostCardDataModel;
  potentialCostCard2ConfigModel: PotentialCostCardConfigModel;

  potentialCostCard3DataModel: PotentialCostCardDataModel;
  potentialCostCard3ConfigModel: PotentialCostCardConfigModel;

  potentialCostCard4DataModel: PotentialCostCardDataModel;
  potentialCostCard4ConfigModel: PotentialCostCardConfigModel;

  matrixDataModel: MatrixModel;
  matrixConfigModel: MatrixConfigModel;

  matrixA2DataModel: MatrixA2Model;
  matrixA2ConfigModel: MatrixA2ConfigModel;

  dialogModel: DialogModel = new DialogModel();


  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _eventActionServiceBase: EventActionService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _appRepoService: AppRepoService,

  ) {
    super(
      _serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner
    );

    this.dashboardSelectsDataModel = DashboardSelectsDataModel.getInstance();
    this.dashboardSelectsConfigModel = DashboardSelectsConfigModel.getInstance();

    this.countIndicatorV11DataModel = CountIndicatorV1DataModel.getInstance();
    this.countIndicatorV11ConfigModel = CountIndicatorV1ConfigModel.getInstance();

    this.countIndicatorV12DataModel = CountIndicatorV1DataModel.getInstance();
    this.countIndicatorV12ConfigModel = CountIndicatorV1ConfigModel.getInstance();

    this.countIndicatorV13DataModel = CountIndicatorV1DataModel.getInstance();
    this.countIndicatorV13ConfigModel = CountIndicatorV1ConfigModel.getInstance();

    this.countIndicatorV14DataModel = CountIndicatorV1DataModel.getInstance();
    this.countIndicatorV14ConfigModel = CountIndicatorV1ConfigModel.getInstance();

    this.stepperCost1DataModel = StepperCostDataModel.getInstance();
    this.stepperCost1ConfigModel = StepperCostConfigModel.getInstance();

    this.stepperCost2DataModel = StepperCostDataModel.getInstance();
    this.stepperCost2ConfigModel = StepperCostConfigModel.getInstance();

    this.stepperCost3DataModel = StepperCostDataModel.getInstance();
    this.stepperCost3ConfigModel = StepperCostConfigModel.getInstance();

    this.stepperCost4DataModel = StepperCostDataModel.getInstance();
    this.stepperCost4ConfigModel = StepperCostConfigModel.getInstance();

    this.potentialCostCard1DataModel = PotentialCostCardDataModel.getInstance();
    this.potentialCostCard1ConfigModel = PotentialCostCardConfigModel.getInstance();

    this.potentialCostCard2DataModel = PotentialCostCardDataModel.getInstance();
    this.potentialCostCard2ConfigModel = PotentialCostCardConfigModel.getInstance();

    this.potentialCostCard3DataModel = PotentialCostCardDataModel.getInstance();
    this.potentialCostCard3ConfigModel = PotentialCostCardConfigModel.getInstance();

    this.potentialCostCard4DataModel = PotentialCostCardDataModel.getInstance();
    this.potentialCostCard4ConfigModel = PotentialCostCardConfigModel.getInstance();

    this.matrixDataModel = MatrixModel.getInstance();
    this.matrixConfigModel = MatrixConfigModel.getInstance();


    this.matrixA2DataModel = MatrixA2Model.getInstance();
    this.matrixA2ConfigModel = MatrixA2ConfigModel.getInstance();

  }

  ngOnInit(): void {
    this.bindDashboardSelectsDataModel();
    this.bindDashboardSelectsConfigModel();

    this.bindCountIndicatorV1DataModel();
    this.bindCountIndicatorV1ConfigModel();

    this.bindCountIndicatorV2DataModel();
    this.bindCountIndicatorV2ConfigModel();

    this.bindCountIndicatorV3DataModel();
    this.bindCountIndicatorV3ConfigModel();

    this.bindCountIndicatorV4DataModel();
    this.bindCountIndicatorV4ConfigModel();

    this.bindStepperCost1DataModel();
    this.bindStepperCost1ConfigModel();

    this.bindStepperCost2DataModel();
    this.bindStepperCost2ConfigModel();

    this.bindStepperCost3DataModel();
    this.bindStepperCost3ConfigModel();

    this.bindStepperCost4DataModel();
    this.bindStepperCost4ConfigModel();

    this.bindPotentialCostCard1DataModel();
    this.bindPotentialCostCard1ConfigModel();

    this.bindPotentialCostCard2DataModel();
    this.bindPotentialCostCard2ConfigModel();

    this.bindPotentialCostCard3DataModel();
    this.bindPotentialCostCard3ConfigModel();

    this.bindPotentialCostCard4DataModel();
    this.bindPotentialCostCard4ConfigModel();

    this.bindMatrixDataModel();
    this.bindMatrixConfigModel();

    this.bindMatrixA2DataModel();
    this.bindMatrixA2ConfigModel();
    this.bindMatrixA2Events();

    this.getPotentialCostCardData();

    this.getCountIndicatorStepperCostData();

  }


  getCountIndicatorStepperCostData(){
    this._serverApi.get<any>("/api/v1/cost-penalty/dashboard/status-count-and-cost").subscribe(response => {

      this.countIndicatorV11DataModel.data.count = response.groups[0].total;
    this.countIndicatorV12DataModel.data.count = response.groups[1].total;
    this.countIndicatorV13DataModel.data.count = response.groups[2].total;
    this.countIndicatorV14DataModel.data.count = response.groups[3].total;
    this.stepperCost1DataModel.StepperCostfilterModel = this.convertTostepperCost1ResponseModel( response.groups[0].items);
    this.stepperCost2DataModel.StepperCostfilterModel = this.convertTostepperCost2ResponseModel( response.groups[1].items);
    this.stepperCost3DataModel.StepperCostfilterModel = this.convertTostepperCost3ResponseModel( response.groups[2].items);
     this.stepperCost4DataModel.StepperCostfilterModel = this.convertTostepperCost4ResponseModel( response.groups[3].items);

    }, error => {
      console.log(error);
    });
  }


  convertTostepperCost1ResponseModel(data) : StepperCostfilterModel[]{
    let convertedData = new Array<StepperCostfilterModel>();

    if(data == undefined) return convertedData;
    if(data.length == 0) return convertedData;

    data.forEach(item => {
      let dataItem = new StepperCostfilterModel ();
      dataItem.code = "TASK001";
      dataItem.color = "#3e6fb6";
      dataItem.count = "50";
      dataItem.cost = item.data;
      // dataItem.countpercentage: "19.5122",
      // dataItem.countvisible: "0",
      // dataItem.display: "0",
      dataItem.displayheadericon = "false";
      // dataItem.iconname: "timer",
      dataItem.name = item.name;
      // dataItem.producttypename: "Adhoc Quotation",
      // dataItem.tasktypesequence: 1,
      // dataItem.tasktypeuid: 9050000000,
      dataItem.isValueVisible = 'true';
      dataItem.isPercentageVisible = 'false';

      convertedData.push(dataItem);
    })

    return convertedData;
  }


  convertTostepperCost2ResponseModel(data) : StepperCostfilterModel[]{
    let convertedData = new Array<StepperCostfilterModel>();

    if(data == undefined) return convertedData;
    if(data.length == 0) return convertedData;

    data.forEach(item => {
      let dataItem = new StepperCostfilterModel ();
      dataItem.code = "TASK001";
      dataItem.color = "#3e6fb6";
      dataItem.count = "50";
      dataItem.cost = item.data;
      // dataItem.countpercentage: "19.5122",
      // dataItem.countvisible: "0",
      // dataItem.display: "0",
      dataItem.displayheadericon = "false";
      // dataItem.iconname: "timer",
      dataItem.name = item.name;
      // dataItem.producttypename: "Adhoc Quotation",
      // dataItem.tasktypesequence: 1,
      // dataItem.tasktypeuid: 9050000000,
      dataItem.isValueVisible = 'true';
      dataItem.isPercentageVisible = 'false';

      convertedData.push(dataItem);
    })

    return convertedData;
  }

  convertTostepperCost3ResponseModel(data) : StepperCostfilterModel[]{
    let convertedData = new Array<StepperCostfilterModel>();

    if(data == undefined) return convertedData;
    if(data.length == 0) return convertedData;

    data.forEach(item => {
      let dataItem = new StepperCostfilterModel ();
      dataItem.code = "TASK001";
      dataItem.color = "#3e6fb6";
      dataItem.count = "50";
      dataItem.cost = item.data;
      // dataItem.countpercentage: "19.5122",
      // dataItem.countvisible: "0",
      // dataItem.display: "0",
      dataItem.displayheadericon = "false";
      // dataItem.iconname: "timer",
      dataItem.name = item.name;
      // dataItem.producttypename: "Adhoc Quotation",
      // dataItem.tasktypesequence: 1,
      // dataItem.tasktypeuid: 9050000000,
      dataItem.isValueVisible = 'true';
      dataItem.isPercentageVisible = 'false';

      convertedData.push(dataItem);
    })

    return convertedData;
  }

  convertTostepperCost4ResponseModel(data) : StepperCostfilterModel[]{
    let convertedData = new Array<StepperCostfilterModel>();

    if(data == undefined) return convertedData;
    if(data.length == 0) return convertedData;

    data.forEach(item => {
      let dataItem = new StepperCostfilterModel ();
      dataItem.code = "TASK001";
      dataItem.color = "#3e6fb6";
      dataItem.count = "50";
      dataItem.cost = item.data;
      // dataItem.countpercentage: "19.5122",
      // dataItem.countvisible: "0",
      // dataItem.display: "0",
      dataItem.displayheadericon = "false";
      // dataItem.iconname: "timer",
      dataItem.name = item.name;
      // dataItem.producttypename: "Adhoc Quotation",
      // dataItem.tasktypesequence: 1,
      // dataItem.tasktypeuid: 9050000000,
      dataItem.isValueVisible = 'true';
      dataItem.isPercentageVisible = 'false';

      convertedData.push(dataItem);
    })

    return convertedData;
  }

  getPotentialCostCardData(){
    this._serverApi.get<any>("/api/v1/cost-penalty/dashboard/management-cost").subscribe(response => {
      this.potentialCostCard1DataModel.data.cost = response.groups[0].items[0].data;
      this.potentialCostCard1DataModel.data.label1 = response.groups[0].items[0].name;

      this.potentialCostCard2DataModel.data.cost = response.groups[0].items[1].data;
      this.potentialCostCard2DataModel.data.label1 = response.groups[0].items[1].name;

      this.potentialCostCard3DataModel.data.cost = response.groups[0].items[2].data;
      this.potentialCostCard3DataModel.data.label1 = response.groups[0].items[2].name;

      this.potentialCostCard4DataModel.data.cost = response.groups[0].items[3].data;
      this.potentialCostCard4DataModel.data.label1 = response.groups[0].items[3].name;



    }, error => {
      console.log(error);
    });
  }

  bindMatrixA2DataModel() {
    this.matrixA2DataModel.tableRowHeadingLeft = "15%";
    this.matrixA2DataModel.tableRowHeadingRight = "23%";
    this.matrixA2DataModel.apiDataUrl = "/v1/cost-penalty/dashboard/jeopardy-metrics";
    this.matrixA2DataModel.showProgressBar = true;
    this.matrixA2DataModel.showArrowIcon = true;
    this.matrixA2DataModel.tableTdHeight = "171px";
    this.matrixA2DataModel.columnLength = 4;
    this.matrixA2DataModel.rowLength = 3;
    this.matrixA2DataModel.templateid = "Template1";
    this.matrixA2DataModel.headers = [
      {
        headerText: "Penalty Avoidance",
        headerValue: "Penalty Avoidance"
      },
      {
        headerText: "Penalty Acceptance/Challenge",
        headerValue: "Penalty Acceptance/Challenge"
      },
      {
        headerText: "Payment",
        headerValue: "Payment"
      }
    ];
    this.matrixA2DataModel.rowHeaders = [
      {
        rowText: "Overdue",
        displayRowHeaderText: "Overdue",
        rowIcon: "fa fa-exclamation-triangle",
        rowIconColor: "#4998e2"
      },
      {
        rowText: "Attention Required",
        displayRowHeaderText: "Attention Required",
        rowIcon: "fa fa-bug",
        rowIconColor: "#4998e2"
      },
      {
        rowText: "Meeting Expectations",
        displayRowHeaderText: "Meeting Expectations",
        rowIcon: "fa fa-pencil-square-o",
        rowIconColor: "#4998e2"
      }
    ];
    this.matrixA2DataModel.items = [
      [{
        displayText: 25,
        percentage: 25,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_OUTSTANDING,
        isRatioChartColumn: false,
      }, {
        displayText: 74,
        percentage: 74,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_DUETHISWEEK,
        isRatioChartColumn: false,
      },
      {
        displayText: 74,
        percentage: 74,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_TOTAL,
        isRatioChartColumn: false,
      }],
      [{
        displayText: 30,
        percentage: 30,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_OUTSTANDING,
        isRatioChartColumn: false,
      }, {
        displayText: 60,
        percentage: 60,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_DUETHISWEEK,
        isRatioChartColumn: false,
      },
      {
        displayText: 74,
        percentage: 74,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_TOTAL,
        isRatioChartColumn: false,
      }],
      [{
        displayText: 55,
        percentage: 55,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_OUTSTANDING,
        isRatioChartColumn: false,
      }, {
        displayText: 80,
        percentage: 80,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_DUETHISWEEK,
        isRatioChartColumn: false,
      },
      {
        displayText: 74,
        percentage: 74,
        filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_TOTAL,
        isRatioChartColumn: false,
      }]

    ]
  }
  bindMatrixA2ConfigModel() {
  }

  bindMatrixA2Events() {
    let eventActions: any = [
      [
        "onMatrixCountClick",
        [
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onMatrixA2CountClick"
            }]
          }
        ]
      ]
    ];
    super.addEventListener(eventActions, this.matrixA2DataModel, this.matrixA2ConfigModel);
  }

  page_onMatrixA2CountClick(eventparams, wigDataContext, params) {
    let filterData: any = new PersistantDynamicFilterModel();
    let matrixLabel = eventparams.dataContext.row + " - " + eventparams.dataContext.col;
    // alert(eventparams.dataContext.row)
    if(eventparams.dataContext.row =="Fixed Penalty Notices" || eventparams.dataContext.row =="Defects" ){
      this.dialogModel = new DialogModel();
      this.dialogModel.visible = true;
      this.dialogModel.header="Listing Popup";


      }
    else{
      filterData.managementMetricsFilter = eventparams.dataContext.filterValue;
      this.setNavigationDataAndNavigate(filterData, matrixLabel, FILTER_TYPE.DYNAMIC_FILTER);
    }

  }



  setNavigationDataAndNavigate(filterData, filterListTitle, filterType?: any) {
    let navigationData = new Map<string, object>();
    this.globalParameters.set(GLOBAL_PARAM_KEY.FILTERED_LIST_TITLE, filterListTitle);
    navigationData.set(GLOBAL_PARAM_KEY.FILTERED_LIST_TITLE,
      this.globalParameters.get(GLOBAL_PARAM_KEY.FILTERED_LIST_TITLE));
    this._sessionStorageService.setNavigationData(navigationData);
    this.setFilterDataToAppGlobalPersistantData(filterData, filterType);
    this._router.navigate(['./admin/pcp-workbench']);
  }

  setFilterDataToAppGlobalPersistantData(filterData, filterType?: any) {

    let filterGlobalPersistData: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(GLOBAL_PARAM_KEY.APP_FILTER);
    if (filterType == FILTER_TYPE.DYNAMIC_FILTER) {
      filterGlobalPersistData.persistantfilterType = FILTER_TYPE.DYNAMIC_FILTER;
      filterGlobalPersistData.persistantDynamicFilterModel = filterData;
    } else {
      filterGlobalPersistData.persistantDynamicFilterModel=null;
      filterGlobalPersistData.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
      filterGlobalPersistData.persistantAdvanceFilterModel = filterData;
    }
    this._appRepoService.appRepo.appGlobalPersistantData.set(GLOBAL_PARAM_KEY.APP_FILTER, filterGlobalPersistData);
  }


  bindMatrixDataModel() {
    this.matrixDataModel.tableRowHeadingLeft = "10%";
    this.matrixDataModel.tableRowHeadingRight = "23%";
    this.matrixDataModel.tableTdHeight = "101px";
    this.matrixDataModel.apiDataUrl = "/v1/widget/getwidgetdata";
    this.matrixDataModel.showProgressBar = true;
    this.matrixDataModel.templateid = "Template1";
    this.matrixDataModel.showArrowIcon = true;
    this.matrixDataModel.columnLength = 3;
    this.matrixDataModel.rowLength = 3;
    this.matrixDataModel.headers = [
      {
        headerText: "With Streetworks Admin Team",
        headerValue: "With Streetworks Admin Team"
      },
      {
        headerText: "With Finance Admin Team",
        headerValue: "With Finance Admin Team"
      }
    ];
    this.matrixDataModel.rowHeaders = [
      {
        rowText: "Meeting Expectations",
        displayRowHeaderText: "Meeting Expectations",
        rowIcon: "fa fa-exclamation-triangle",
        rowIconColor: "#662F8E"
      },
      {
        rowText: "Attention Required",
        displayRowHeaderText: "Attention Required",
        rowIcon: "fa fa-exclamation-triangle",
        rowIconColor: "#FF0000"
      },
      {
        rowText: "Overdue",
        displayRowHeaderText: "Overdue",
        rowIcon: "fa fa-exclamation-triangle",
        rowIconColor: "#FFC300"
      }
    ];
    this.matrixDataModel.items = [
      [
        {
          displayText: 23,
          percentage: 23,
          bottonText: 0,
          text1: "",
          text2: "",
          iconname: "",
          iconcolor: "",
          rowArrowIcon: "",
          rowArrowColor: "",
          bottomCenterText: ""
        },
        {
          displayText: 32,
          percentage: 32,
          bottonText: 0,
          text1: "",
          text2: "",
          iconname: "",
          iconcolor: "",
          rowArrowIcon: "",
          rowArrowColor: "",
          bottomCenterText: ""
        }
      ],
      [
        {
          displayText: 10,
          percentage: 10,
          bottonText: 0,
          text1: "",
          text2: "",
          iconname: "",
          iconcolor: "",
          rowArrowIcon: "",
          rowArrowColor: "",
          bottomCenterText: ""
        },
        {
          displayText: 15,
          percentage: 15,
          bottonText: 0,
          text1: "",
          text2: "",
          iconname: "",
          iconcolor: "",
          rowArrowIcon: "",
          rowArrowColor: "",
          bottomCenterText: ""
        }
      ],
      [
        {
          displayText: 6,
          percentage: 6,
          bottonText: 0,
          text1: "",
          text2: "",
          iconname: "",
          iconcolor: "",
          rowArrowIcon: "",
          rowArrowColor: "",
          bottomCenterText: ""
        },
        {
          displayText: 14,
          percentage: 14,
          bottonText: 0,
          text1: "",
          text2: "",
          iconname: "",
          iconcolor: "",
          rowArrowIcon: "",
          rowArrowColor: "",
          bottomCenterText: ""
        }
      ]
    ];
  }
  bindMatrixConfigModel() {
  }

  bindPotentialCostCard1ConfigModel() {
  }
  bindPotentialCostCard1DataModel() {
    // this.potentialCostCard1DataModel.data.label1 = "Estimated FPN Charges";
    // this.potentialCostCard1DataModel.data.label2 = "Due Today";
    // this.potentialCostCard1DataModel.data.cost = 750;
  }

  bindPotentialCostCard2ConfigModel() {
  }
  bindPotentialCostCard2DataModel() {
    this.potentialCostCard2DataModel.data.label1 = "Invoice Charges";
    this.potentialCostCard2DataModel.data.label2 = "Due Today";
    // this.potentialCostCard2DataModel.data.cost = 1020;
  }

  bindPotentialCostCard3ConfigModel() {
  }
  bindPotentialCostCard3DataModel() {
    this.potentialCostCard3DataModel.data.label1 = "Annual Cummulative";
    this.potentialCostCard3DataModel.data.label2 = "Avoidable Costs";
    // this.potentialCostCard3DataModel.data.cost = 8300;
    this.potentialCostCard3DataModel.data.backgroundColor = '--potential-cost-card-bg1-color';
  }

  bindPotentialCostCard4ConfigModel() {
  }
  bindPotentialCostCard4DataModel() {
    this.potentialCostCard4DataModel.data.label1 = "Invoiced";
    this.potentialCostCard4DataModel.data.label2 = "Avoidable Costs";
    // this.potentialCostCard4DataModel.data.cost = 6200;
    this.potentialCostCard4DataModel.data.backgroundColor = '--potential-cost-card-bg1-color';
  }

  bindDashboardSelectsDataModel() {
    this.dashboardSelectsDataModel.data = [
      {
        selectLable: 'Highway Authority',
        shouldLoadOptionFromAPI: false,
        apiUrlForOptions: '',
        options: [
          {
            label: 'Higway Authority 1',
            value: 1
          },
          {
            label: 'Higway Authority 2',
            value: 2
          }
        ]
      },
      {
        selectLable: 'Contractor',
        shouldLoadOptionFromAPI: false,
        apiUrlForOptions: '',
        options: [
          {
            label: 'Contractor 1',
            value: 1
          },
          {
            label: 'Contractor 2',
            value: 2
          }
        ]
      }
    ]
  }
  bindDashboardSelectsConfigModel() {
  }

  bindCountIndicatorV1DataModel() {
    this.countIndicatorV11DataModel.data.count = 10;
    this.countIndicatorV11DataModel.data.lable = 'Planned Permits';
    this.countIndicatorV11DataModel.data.countStyle['background-color'] = '#ffb300';
  };
  bindCountIndicatorV1ConfigModel() {
  };

  bindCountIndicatorV2DataModel() {
    this.countIndicatorV12DataModel.data.count = '08';
    this.countIndicatorV12DataModel.data.lable = 'Granted Permits';
    this.countIndicatorV12DataModel.data.countStyle['background-color'] = '#30b24a';
  };
  bindCountIndicatorV2ConfigModel() {
  };

  bindCountIndicatorV3DataModel() {
    this.countIndicatorV13DataModel.data.count = 20;
    this.countIndicatorV13DataModel.data.lable = 'WIP Permits';
    this.countIndicatorV13DataModel.data.countStyle['background-color'] = '#bbc6ef';
  };
  bindCountIndicatorV3ConfigModel() {
  };

  bindCountIndicatorV4DataModel() {
    this.countIndicatorV14DataModel.data.count = 100;
    this.countIndicatorV14DataModel.data.lable = 'Closed Permits';
    this.countIndicatorV14DataModel.data.countStyle['background-color'] = '#4d4f5c';
  };
  bindCountIndicatorV4ConfigModel() {
  };

  bindStepperCost1ConfigModel() {

    let eventActions: any = [
      [
        WidgetConstants.COUNT_CLICKED,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onCountClick"
          }]
        }]
      ]
    ];

    super.addEventListener(eventActions, this.stepperCost1DataModel, this.stepperCost1ConfigModel)

  }
  bindStepperCost1DataModel() {

    this.stepperCost1DataModel.StepperCostfilterModel = [
      {
        code: "TASK001",
        color: "#3e6fb6",
        count: "50",
        cost: 5060,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Estimated Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      }
    ]

  }

  bindStepperCost2ConfigModel() {

    let eventActions: any = [
      [
        WidgetConstants.COUNT_CLICKED,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onCountClick"
          }]
        }]
      ]
    ];

    super.addEventListener(eventActions, this.stepperCost2DataModel, this.stepperCost2ConfigModel)

  }
  bindStepperCost2DataModel() {

    this.stepperCost2DataModel.StepperCostfilterModel = [
      {
        code: "TASK001",
        color: "#3e6fb6",
        count: "50",
        cost: 4620,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Estimated Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 645,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Avoidable Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      }
    ]

  }

  bindStepperCost3ConfigModel() {

    let eventActions: any = [
      [
        WidgetConstants.COUNT_CLICKED,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onCountClick"
          }]
        }]
      ]
    ];

    super.addEventListener(eventActions, this.stepperCost3DataModel, this.stepperCost3ConfigModel)

  }
  bindStepperCost3DataModel() {

    this.stepperCost3DataModel.StepperCostfilterModel = [
      {
        code: "TASK001",
        color: "#3e6fb6",
        count: "50",
        cost: 4270,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Estimated Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 1280,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Avoidable Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      }
    ]

  }

  bindStepperCost4ConfigModel() {

    let eventActions: any = [
      [
        WidgetConstants.COUNT_CLICKED,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onCountClick"
          }]
        }]
      ]
    ];

    super.addEventListener(eventActions, this.stepperCost4DataModel, this.stepperCost4ConfigModel)

  }
  bindStepperCost4DataModel() {

    this.stepperCost4DataModel.StepperCostfilterModel = [
      {
        code: "TASK001",
        color: "#3e6fb6",
        count: "50",
        cost: 63000,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Estimated Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK002",
        color: "#838296",
        count: "20",
        cost: 40000,
        countpercentage: "40.2439",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer_off",
        name: 'Invoiced Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 2,
        tasktypeuid: 9050000001,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK019",
        color: "#4d4f5c",
        count: "10",
        cost: 32000,
        countpercentage: "5.4878",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "verified_user",
        name: 'Paid Cost',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 3,
        tasktypeuid: 9050000002,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      }
    ]

  }

}
