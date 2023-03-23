import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { MatrixConfigModel, MatrixHeaderItemModel, MatrixModel, MatrixRowHeadingItemModel } from './matrix.model';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: MatrixModel;
  @Input() configModel: MatrixConfigModel;
  wgmatrixdata:any[]=[];
  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) { 
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
    // this.matrixdata();
    // this.matrixConvertData(this.wgmatrixdata);
    // this.dataModel.items = MatrixModel.getEmptyItems(this.dataModel.rowLength, this.dataModel.columnLength)
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

  
  getHeaderItem(colNumber: number) {
    try {
      return this.dataModel.headers[colNumber]
    } catch (err) {
      console.error("Out of index header item", err);
    }

    return new MatrixHeaderItemModel();
  }

  getRowHeaderItem(rowNumber: number) {
    try {
      return this.dataModel.rowHeaders[rowNumber]
    } catch (err) {
      console.error("Out of index row item", err)
    }

    return new MatrixRowHeadingItemModel();

  }

  getProgressValue(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].percentage;
    } catch (err) {
      return 0
    }
  }

  getItem(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].displayText;
    } catch (err) {
      return 0
    }
  }

  getItemText1(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].text1;
    } catch (err) {
      return ''
    }
  }

  getItemText2(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].text2;
    } catch (err) {
      return ''
    }
  }

  getBottonText(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].bottonText;
    } catch (err) {
      return 0
    }
  }

  getIconColor(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].iconcolor;
    } catch (err) {
      return 0
    }
  }

  getIconName(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].iconname;
    } catch (err) {
      return 0
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  matrixdata(){
    this.wgmatrixdata= [
      {
        colname: "With Back Office",
        prival: 25,
        progval: 13,
        rowname: "Approaching Jeopardy"
      },
      {
        colname: "With Back Office",
        prival: 74,
        progval: 38,
        rowname: "Meeting Expectations"
      },
      {
        colname: "With Back Office",
        prival: 29,
        progval: 15,
        rowname: "Overdue"
      },
      {
        colname: "With Highway Authority",
        prival: 36,
        progval: 18,
        rowname: "Overdue"
      },
      {
        colname: "With Highway Authority",
        prival: 21,
        progval: 11,
        rowname: "Approaching Jeopardy"
      },
      {
        colname: "With Operation",
        prival: 11,
        progval: 6,
        rowname: "Meeting Expectations"
      }
    ]
  }

  matrixConvertData(response) {
    if (response.length > 0) {
      console.log("response: ",response);
      response.forEach((row) => {

        let headerIndex = null;
        let rowIndex = null;

        for (let i = 0; i < this.dataModel.headers.length; i++) {
            if (this.dataModel.headers[i].headerValue == row.colname) {
            headerIndex = i;
          }
        }

        for (let i = 0; i < this.dataModel.rowHeaders.length; i++) {
            let displayRowHeaderText = this.dataModel.rowHeaders[i].displayRowHeaderText
            if (row.rowname.includes(this.dataModel.rowHeaders[i].displayRowHeaderText)) {
              this.dataModel.rowHeaders[i].displayRowHeaderText=row.rowname;
              rowIndex = i;
          }
        }

        if (rowIndex != null && headerIndex != null) {
          this.dataModel.items[rowIndex][headerIndex].displayText = row.prival
          this.dataModel.items[rowIndex][headerIndex].bottonText = row.secval
          this.dataModel.items[rowIndex][headerIndex].percentage = row.progval
          this.dataModel.items[rowIndex][headerIndex].text1 = row.text1
          this.dataModel.items[rowIndex][headerIndex].text2 = row.text2
          this.dataModel.items[rowIndex][headerIndex].iconname = row.iconname
          this.dataModel.items[rowIndex][headerIndex].iconcolor = row.iconcolor
        }
      })
    }

  }


}
