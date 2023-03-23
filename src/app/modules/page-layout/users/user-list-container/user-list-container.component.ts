import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.css']
})
export class UserListContainerComponent implements OnInit {

  display: boolean = true; 
  constructor() { }

  ngOnInit(): void {
  }

  togglePopup(event:any){
    this.display = event;
  }

}
