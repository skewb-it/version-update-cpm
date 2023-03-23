import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPRecordWriteOffConfigModel, PCPRecordWriteOffDataModel } from './record-write-off.model';


@Component({
  selector: 'app-record-write-off',
  templateUrl: './record-write-off.component.html',
  styleUrls: ['./record-write-off.component.css']
})
export class RecordWriteOffComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PCPRecordWriteOffDataModel;
  @Input() configModel: PCPRecordWriteOffConfigModel;


  constructor(
    private fb: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,

  ) { 
    super(_serverApi, _validationService);

  }

  ngOnInit(): void {
    this.createFormGroup();

  }


  createFormGroup() {

    this.wgFormGroup = this.fb.group({
      'writeoffamount': ['',[Validators.required]],
      'agreedbyhacontactname': ['', [Validators.required]],

   
    });



    this.wgOnInit();
  }


  setFieldData() {
  }

  getControlData() {
  }

  convertData(response: any) {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }


}
