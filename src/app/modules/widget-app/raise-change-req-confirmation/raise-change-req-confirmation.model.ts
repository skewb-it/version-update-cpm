import { EventEmitter } from 'events';

export class RaiseChangeReqConfirmationConfigModel {
    static getInstance<T>(): RaiseChangeReqConfirmationConfigModel {
        let model = new RaiseChangeReqConfirmationConfigModel();
        return model
    }
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class RaiseChangeReqConfirmationDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    globalParameters: Map<any, any>;
    data: RaiseChangeReqConfirmationData;
    static getInstance<T>(): RaiseChangeReqConfirmationDataModel {
        let model = new RaiseChangeReqConfirmationDataModel();
        model.isSelfDataLoad = true;
        model.globalParameters = new Map<any, any>()
        model.data = new RaiseChangeReqConfirmationData();
        return model;
    }
}

export class RaiseChangeReqConfirmationData {
    ispermitModReqRaised: boolean;
    warningMassages?: string;
    conditionsForRaiseChangeReq?: any[];
    reqRaiseCharges?: string;
    conformationStatement?: string;

    constructor() {
        this.ispermitModReqRaised = false;
    }
}
