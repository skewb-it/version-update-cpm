import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateOrganisationComponent } from '../create-organisation/create-organisation.component';

@Component({
  selector: 'app-organisation-listing',
  templateUrl: './organisation-listing.component.html',
  styleUrls: ['./organisation-listing.component.css']
})
export class OrganisationListingComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(CreateOrganisationComponent);
   }
  dataSource = new MatTableDataSource<ORRow>(ELEMENT_DATA1);
  columnsToDisplay = ['OrganizationName','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
}

export interface ORRow {
  OrganizationName: Array <string>;
  }
  
const ELEMENT_DATA1: ORRow[] = [
  {
    OrganizationName: ["0","Larson Group"]
  },
  {
    OrganizationName: ["1","Schmitt - Buckridge"]
  },
  {
    OrganizationName: ["3","Morissette and Sons"]
  },
  {
    OrganizationName: ["0","Eichmann and Sons"]
  }
];

