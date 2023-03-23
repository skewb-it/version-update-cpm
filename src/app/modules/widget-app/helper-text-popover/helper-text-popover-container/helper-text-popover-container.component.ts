import { Component, OnInit } from '@angular/core';
import { HelperTextPopoverService } from 'src/app/services/helper-text-popover.service';

@Component({
  selector: 'app-helper-text-popover-container',
  templateUrl: './helper-text-popover-container.component.html',
  styleUrls: ['./helper-text-popover-container.component.css']
})
export class HelperTextPopoverContainerComponent implements OnInit {

  constructor(public helperTextPopoverService: HelperTextPopoverService) { }

  ngOnInit(): void {
  }

}
