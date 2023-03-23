import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-bulkupload-data',
  templateUrl: './view-bulkupload-data.component.html',
  styleUrls: ['./view-bulkupload-data.component.css']
})
export class ViewBulkuploadDataComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  dataSource = new MatTableDataSource<UploadRow>(ELEMENT_DATA1);
  columnsToDisplay = ['PermitRefNumber', 'WorksLocation', 'WorksCategory', 'WorkDescription', 'ProjectRefNumber', 'StartDate', 'EndDate', 'Cost'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface UploadRow {
  PermitRefNumber: string;
  WorksLocation: string;
  WorksCategory: string;
  WorkDescription: string;
  ProjectRefNumber: string;
  StartDate: string;
  EndDate: string;
  Cost: string;

}

const ELEMENT_DATA1: UploadRow[] = [
  {
    PermitRefNumber: "A301-MUA0000183",
    WorksLocation: "Opp Salford Priors C of E Primary School, School Road, Salford Priors, Evesham",
    WorksCategory: "Minor",
    WorkDescription: "x3 trial holes to locate existing utilities before laying new gas supply",
    ProjectRefNumber: "MUA0000183",
    StartDate: "21-02-2019",
    EndDate: "25-02-2019",
    Cost: "£65"
  }, {
    PermitRefNumber: "A301-MUA0000183",
    WorksLocation: "Opp Salford Priors C of E Primary School, School Road, Salford Priors, Evesham",
    WorksCategory: "Minor",
    WorkDescription: "x3 trial holes to locate existing utilities before laying new gas supply",
    ProjectRefNumber: "MUA0000183",
    StartDate: "21-02-2019",
    EndDate: "25-02-2019",
    Cost: "£65"
  }, {
    PermitRefNumber: "A301-MUA0000183",
    WorksLocation: "Opp Salford Priors C of E Primary School, School Road, Salford Priors, Evesham",
    WorksCategory: "Minor",
    WorkDescription: "x3 trial holes to locate existing utilities before laying new gas supply",
    ProjectRefNumber: "MUA0000183",
    StartDate: "21-02-2019",
    EndDate: "25-02-2019",
    Cost: "£65"
  }];

