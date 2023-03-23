import { Component, OnInit, Input, HostListener } from '@angular/core';
import { HelperTextDataService } from 'src/app/services/helper-text-data.service';

@Component({
  selector: 'app-helper-text',
  templateUrl: './helper-text.component.html',
  styleUrls: ['./helper-text.component.css']
})
export class HelperTextComponent implements OnInit {

  @Input() helperTextContent: string;
  @Input() eleRef: any;

  rect;
  helpTextData;

  constructor(
    private helperTextDataService: HelperTextDataService
  ) { }

  ngOnInit(): void {
    this.rect = this.eleRef.nativeElement.getBoundingClientRect();
    this.parseAndSetHelpTextData()
  }

  parseAndSetHelpTextData() {
    this.helpTextData = this.helperTextDataService.getHelperTextData(this.helperTextContent);
  }

  ngAfterViewInit(): void {
    // position based on `ref`
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // update position based on `ref`
  }

}
