import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-permit-change-request',
  templateUrl: './view-permit-change-request.component.html',
  styleUrls: ['./view-permit-change-request.component.css']
})
export class ViewPermitChangeRequestComponent implements OnInit {
  actionList: string[] = ['Option 1', 'Option 1', 'Option 1', 'Option 1', 'Option 1', 'Option 1'];
  constructor() { }

  ngOnInit(): void {
  }

}
