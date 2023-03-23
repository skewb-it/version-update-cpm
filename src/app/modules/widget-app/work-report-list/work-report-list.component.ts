import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';
import { WorkListConfigModel, WorkListDataModel } from './work-report-list.model';

@Component({
  selector: 'app-work-report-list',
  templateUrl: './work-report-list.component.html',
  styleUrls: ['./work-report-list.component.css']
})
export class WorkReportListComponent extends WidgetComponentBase implements OnInit {
  cols: any[] = [];
  worklistresponse:any[];
  dataListLength: number = 0;
  filteredrecords: number;
  globalSerachInput: string;
  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
   }

  ngOnInit(): void {
    this.wgOnInit();
    this.initData();
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

  customSort(event: LazyLoadEvent) {
    
  }

  paginate(event) {
  }

  initData(){
    this.setColHeadersForTable(); 
    this.gettabledata()
    this.dataListLength = this.worklistresponse.length;
    this.filteredrecords =this.worklistresponse.length;
  }

  globalSearch(value){
    // console.log("value; ",value);
  }

  setColHeadersForTable() {
    this.cols = [
      { field: 'workreferencenumber', header: 'Work Reference Number' },
      { field: 'proposedstartdate', header: 'Proposed Start Date' },
      { field: 'proposedenddate', header: 'Proposed End Date' },
      { field: 'workstatus', header: 'Work Status' },
      { field: 'permitstatus', header: 'Permit Status' },
      { field: 'permitreferencenumber', header: 'Permit Reference Number' },
      { field: 'actualstartdate', header: 'Actual Start Date' },
      { field: 'actualenddate', header: 'Actual End Date' },
      { field: 'actions', header: 'Actions' }
    ];
  }

  gettabledata(){
    this.worklistresponse=[
      {
        workreferencenumber:"BC43206383973",
        proposedstartdate:"2020-06-07T16:53:54Z",
        proposedenddate:"2020-06-09T16:53:54Z",
        workstatus:"Working in Progress",
        permitstatus:"Granted",
        permitreferencenumber:"BC4320633873-01",
        actualstartdate:"2020-07-07T16:53:54Z",
        actualenddate:"2020-07-06T16:53:54Z",
      },
      {
        workreferencenumber:"BC43206383973",
        proposedstartdate:"2020-06-07T16:53:54Z",
        proposedenddate:"2020-06-09T16:53:54Z",
        workstatus:"Working in Progress",
        permitstatus:"Granted",
        permitreferencenumber:"BC4320633873-01",
        actualstartdate:"2020-07-07T16:53:54Z",
        actualenddate:"2020-07-06T16:53:54Z",
      },
      {
        workreferencenumber:"BC43206383973",
        proposedstartdate:"2020-06-07T16:53:54Z",
        proposedenddate:"2020-06-09T16:53:54Z",
        workstatus:"Working in Progress",
        permitstatus:"Granted",
        permitreferencenumber:"BC4320633873-01",
        actualstartdate:"2020-07-07T16:53:54Z",
        actualenddate:"2020-07-06T16:53:54Z",
      },
      {
        workreferencenumber:"BC43206383973",
        proposedstartdate:"2020-06-07T16:53:54Z",
        proposedenddate:"2020-06-09T16:53:54Z",
        workstatus:"Working in Progress",
        permitstatus:"Granted",
        permitreferencenumber:"BC4320633873-01",
        actualstartdate:"2020-07-07T16:53:54Z",
        actualenddate:"2020-07-06T16:53:54Z",
      },
      {
        workreferencenumber:"BC43206383973",
        proposedstartdate:"2020-06-07T16:53:54Z",
        proposedenddate:"2020-06-09T16:53:54Z",
        workstatus:"Working in Progress",
        permitstatus:"Granted",
        permitreferencenumber:"BC4320633873-01",
        actualstartdate:"2020-07-07T16:53:54Z",
        actualenddate:"2020-07-06T16:53:54Z",
      },
      {
        workreferencenumber:"BC43206383973",
        proposedstartdate:"2020-06-07T16:53:54Z",
        proposedenddate:"2020-06-09T16:53:54Z",
        workstatus:"Working in Progress",
        permitstatus:"Granted",
        permitreferencenumber:"BC4320633873-01",
        actualstartdate:"2020-07-07T16:53:54Z",
        actualenddate:"2020-07-06T16:53:54Z",
      }
    ]
  }


}
