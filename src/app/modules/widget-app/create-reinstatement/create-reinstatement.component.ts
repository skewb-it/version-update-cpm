import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-reinstatement',
  templateUrl: './create-reinstatement.component.html',
  styleUrls: ['./create-reinstatement.component.css']
})
export class CreateReinstatementComponent implements OnInit {
  FirstSection:FormGroup;
  SecondSection:FormGroup;
  ThirdSection:FormGroup;

  @ViewChild('fileInput')
  fileInput;

  file: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }


}
