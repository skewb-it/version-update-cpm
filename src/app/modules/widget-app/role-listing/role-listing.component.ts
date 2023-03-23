import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-role-listing',
  templateUrl: './role-listing.component.html',
  styleUrls: ['./role-listing.component.css']
})
export class RoleListingComponent implements OnInit {

  constructor(public dialog: MatDialog) {}


  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(CreateRoleComponent);
   }
  dataSource = new MatTableDataSource<RoleRow>(ELEMENT_DATA1);
  columnsToDisplay = ['RoleTitle', 'PermitRegistration', 'TeamsPermits', 'WorksStartWorkStop','ForwardPlanning','InspectionManagement','CostAndPenaltyManagement','UserManagement','actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
}

export interface RoleRow {
  RoleTitle: string;
  PermitRegistration: Array<string>;
  TeamsPermits: Array<string>;
  WorksStartWorkStop: Array<string>;
  ForwardPlanning: Array<string>;
  InspectionManagement: Array<string>;
  CostAndPenaltyManagement:Array<string>;
  UserUserManagement: Array<string>;

}
  
const ELEMENT_DATA1: RoleRow[] = [
  {
    RoleTitle: "Stuart Monk",
    PermitRegistration: ["1","0"],
    TeamsPermits: ["1","0"],
    WorksStartWorkStop: ["1","0"],
    ForwardPlanning: ["1","0"],
    InspectionManagement: ["1","0"],
    CostAndPenaltyManagement:["1","0"],
    UserUserManagement: ["1","0"]
  }
];