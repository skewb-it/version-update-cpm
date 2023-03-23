import { EventEmitter } from 'events';

export class MatrixConfigModel {

    static getInstance<T>(): MatrixConfigModel {
        let model = new MatrixConfigModel();
        return model
    }

    public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"
    public static readonly COMP_TO_CALLER_ON_CLICK = "ON_CLICK"
    public static readonly COMP_TO_CALLER_ON_CLICK_BOTTOM_TEXT = "ON_CLICK_BOTTOM_TEXT"
    public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA"
    public static readonly COMP_TO_CALLER_PREPARE_DATA = "PREPARE_DATA"
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"



    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();

    EventAction = new Map();

}

export class MatrixModel {

    static getInstance<T>(): MatrixModel {
        let model = new MatrixModel();


        model.tableRowHeadingLeft="26%",
        model.tableRowHeadingRight="37%",
        model.tableTdHeight="150px"

        model.globalParameters = new Map();
        model.isSelfDataLoad = true;
        model.headers = [];
        model.items = [];
        model.rowHeaders = [];

        model.templateid = "Template1";
        model.showArrowIcon = true;

        model.columnLength = 3;
        model.rowLength = 4;
        model.showProgressBar = true;


        let headerItem = new MatrixHeaderItemModel();
        headerItem.headerText = "Awaiting Dispatch"
        model.headers.push(headerItem);

        headerItem = new MatrixHeaderItemModel();
        headerItem.headerText = "With Field Team"
        model.headers.push(headerItem);


        let rowItem = new MatrixRowHeadingItemModel();
        rowItem.rowText = "Overdue";
        rowItem.displayRowHeaderText = "Overdue"
        rowItem.rowIcon = "fa fa-exclamation-triangle"
        rowItem.rowIconColor = "#662F8E";
        model.rowHeaders.push(rowItem);

        rowItem = new MatrixRowHeadingItemModel();
        rowItem.rowText = "Approaching Jeopardy";
        rowItem.displayRowHeaderText = "Approaching Jeopardy"
        rowItem.rowIcon = "fa fa-exclamation-triangle"
        rowItem.rowIconColor = "#FFC300";
        model.rowHeaders.push(rowItem);

        rowItem = new MatrixRowHeadingItemModel();
        rowItem.rowText = "In Jeopardy";
        rowItem.displayRowHeaderText = "In Jeopardy"
        rowItem.rowIcon = "fa fa-exclamation-triangle"
        rowItem.rowIconColor = "#FF0000";
        model.rowHeaders.push(rowItem);

        rowItem = new MatrixRowHeadingItemModel();
        rowItem.rowText = "On Schedule";
        rowItem.displayRowHeaderText = "On Schedule"
        rowItem.rowIcon = "fa fa-exclamation-triangle"
        rowItem.rowIconColor = "#06B900";
        model.rowHeaders.push(rowItem);
        model.headerCirlceClassFlag=false;
        return model
    }


    static getEmptyItems(rows: number, columns: number): MatrixItemModel[][] {

        let items = [];

        for (let i = 0; i < rows; i++) {
            let rowItems = [];
            for (let j = 0; j < columns; j++) {
                let itemModel = new MatrixItemModel();
                itemModel.displayText = 0;
                itemModel.percentage = 0;
                itemModel.bottonText = 0;
                itemModel.iconname='';
                rowItems.push(itemModel);
            }
            items.push(rowItems);
        }

        return items;
    }


    id: string;
    widgetinstanceid: number;
    apiDataUrl: string;
    globalParameters: Map<string, any>;
    isSelfDataLoad: boolean;
    templateid: string;
    columnLength;
    rowLength;
    tableRowHeadingLeft: string;
    tabletitlePadding:string;
    tableRowHeadingRight: string;
    tableTdHeight: string;
    showProgressBar: boolean;
    showBottonText: boolean;
    headers: MatrixHeaderItemModel[]
    rowHeaders: MatrixRowHeadingItemModel[]
    items: MatrixItemModel[][]
    showArrowIcon:boolean;
    headerCirlceClassFlag:boolean;

}


export class MatrixHeaderItemModel {
    constructor() {
        this.headerText = '';
    }
    // headerBackgroundColor:string;
    // displayHeaderIcon:boolean;
    // headerIconColor:string;
    // headerColor: string;
    headerText: string;
    // headerIcon: string;
    headerValue: string;
}

export class MatrixRowHeadingItemModel {

    constructor() {
        this.rowIcon = '';
        this.rowText = '';
        this.rowIconColor = '';

    }
    // colmBackgroundColor:string;

    rowText: string;
    rowIcon: string;
    rowIconColor: string;
    displayRowHeaderText: string;
}

export class MatrixItemModel {
    displayText: number;
    percentage: number;
    bottonText: number;
    rowArrowIcon:string;
    rowArrowColor:string;
    bottomCenterText:string;
    text1: string;
    text2: string;
    iconname:string;
    iconcolor:string;
}

export enum CLICK_EVENT {
    ON_BOTTOM_TEXT = "ON_BOTTOM_TEXT",
    ON_CLICK = "ON_CLICK",
    ON_CLICK_VAL1 = "ON_CLICK_1",
  ON_CLICK_VAL2 = "ON_CLICK_2",
    ON_CLICK_TEMPLATE3 = "ON_CLICK_TEMPLATE3"
}
