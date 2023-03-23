import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class FinanceLiableConfigModel {
    static getInstance<T>(): FinanceLiableConfigModel {
      let model = new FinanceLiableConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
  }

  export class FinanceLiableDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    liabalitylable:any;
    listModel: FinanceLiableModel[];
    static getInstance<T>(): FinanceLiableDataModel {
      let model = new FinanceLiableDataModel();
      model.isSelfDataLoad = true;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.listModel = [];
      model.liabalitylable="";
      return model;
    }
  }

  export class FinanceLiableModel {
    potentiallabel1: string;
    potentiallabel2: string;
    potentialicon:string;
    variationslable1:string;
    variationslable2:string;
    variationsiconcolor:string;
    potentialliabality1:string;
    potentialliabality2:string;
    variationsliabality1:string;
    variationsliabality2:string;
    cardcolor:string;
    constructor() { 
    }


  }
