import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(CreateUserComponent);
   }
  dataSource = new MatTableDataSource<userRow>(ELEMENT_DATA1);
  columnsToDisplay = ['Name', 'Username', 'Email', 'Phone','Workstream','Organization','Role','UserStatus','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
}

export interface userRow {
  Name: string;
  Username: string;
  Email: string;
  Phone: string;
  Workstream: string;
  Organization: string;
  Role:string;
  UserStatus: string;

}
  
const ELEMENT_DATA1: userRow[] = [
  {
    Name: "Stuart Monk",
    Username: "Stuart",
    Email: "sm@Murphy.uk",
    Phone: "01789 321897",
    Workstream: "A3001, A3002",
    Organization: "Murphy Utility Assets",
    Role:"Customer",
    UserStatus: "Active"
  }
];

