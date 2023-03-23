import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperCostDataModel, StepperCostConfigModel } from 'src/app/modules/widget/stepper/stepper-cost/stepper-cost.model';
import { MatTableDataSource } from '@angular/material/table';
import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-pcp-edit-permit-cost',
  templateUrl: './pcp-edit-permit-cost.component.html',
  styleUrls: ['./pcp-edit-permit-cost.component.css']
})
export class PcpEditPermitCostComponent implements OnInit {

  columnsToDisplay = [
    "Select",
    "CostType",
    "Description",
    "Value",
    "Date",
    "DueDate",
    "Status"
  ];
  dataSource = new MatTableDataSource();
  historyList:any[]=[];
  permitCostDetails = new PermitCostDetailsModel();

  stepperCostDataModel: StepperCostDataModel;
  stepperCostConfigModel: StepperCostConfigModel;

  @ViewChild('startDatePicker') startDatePicker: NgxMatDatetimePicker<any>;
  @ViewChild('endDatePicker') endDatePicker: NgxMatDatetimePicker<any>;

  constructor() {
    this.stepperCostDataModel = StepperCostDataModel.getInstance();
    this.stepperCostConfigModel = StepperCostConfigModel.getInstance();
  }

  ngOnInit(): void {
    this.bindStepperCostDataModel();
    this.setTableDummyData();
    this.setDataOnInit();
  }

  bindStepperCostDataModel() {

    this.stepperCostDataModel.StepperCostfilterModel = [
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 130,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Cost Value Estimated',
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
        cost: 0,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Cost Value Invoiced',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 2,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 0,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Cost Value Paid',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 3,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      }
    ]

  }

  setTableDummyData() {
    let dummyData = [
      {
        costType: "PC",
        description: "SECTION 74(7B) Works Stop notice is late",
        value: 70,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "VC",
        description: "SECTION 74(7B) Works Stop notice is late",
        value: 45,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "FPN",
        description: "SECTION 74(7B) Works Stop notice is late",
        value: 15,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      }
    ];
    this.dataSource = new MatTableDataSource(dummyData);
  }

  setDataOnInit(){
    this.setHistoryList();
    this.setPermitCostDetails();
  }

  setHistoryList(){
    this.historyList=[
      {
        detail:'Permit cost of £60 pounds for a standard permit incurred on 10 February 2021.'
      },
      {
        detail:'Variation cost of £35 for variation raised on 13 February 2021.'
      },
      {
        detail:'Potential S74 charge for overrun – notified on 16 February 2021.'
      },
      {
        detail:'FPN received from HA.'
      }
    ]
  }

  setPermitCostDetails(){
    this.permitCostDetails.permitRefNumber = "A330156800479-01"
    this.permitCostDetails.locationdetails = "Tredegar Park round about"
    this.permitCostDetails.highwayAuthority ="HERTFORDSHIRE COUNTY COUNCIL"
    this.permitCostDetails.endDateTime = "2021-04-15T17:00:00.000Z";
    this.permitCostDetails.startDateTime ="2021-04-08T08:00:00.000Z";
    this.permitCostDetails.permitType="Permit Type 1"
  }

}

export class PermitCostDetailsModel {
  permitRefNumber: any;
  locationdetails: any;
  highwayAuthority: any;
  startDateTime: any;
  endDateTime: any;
  permitType:any;
}