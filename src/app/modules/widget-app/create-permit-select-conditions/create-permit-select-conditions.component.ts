import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePermitFormComponent } from '../create-permit-form/create-permit-form.component';

@Component({
  selector: 'app-create-permit-select-conditions',
  templateUrl: './create-permit-select-conditions.component.html',
  styleUrls: ['./create-permit-select-conditions.component.css']
})
export class CreatePermitSelectConditionsComponent implements OnInit {

  @Input() validateData: number;
  nextBtnClick = 0;

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
}
