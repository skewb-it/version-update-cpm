import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  display = true;
  @Output() onSidebarClose = new EventEmitter<boolean>();

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  onsildebarhide() {
    // alert("ASdfa")
    this.display = !this.display;

    this.onSidebarClose.emit(true);
  }
}
