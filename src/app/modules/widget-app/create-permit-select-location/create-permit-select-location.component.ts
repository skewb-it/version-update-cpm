import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePermitDrawMapComponent } from '../create-permit-draw-map/create-permit-draw-map.component';
@Component({
  selector: 'app-create-permit-select-location',
  templateUrl: './create-permit-select-location.component.html',
  styleUrls: ['./create-permit-select-location.component.css']
})
export class CreatePermitSelectLocationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(CreatePermitDrawMapComponent);
   }
}
