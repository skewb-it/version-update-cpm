import {
  APP_SETTING as DB_APP_SETTING,
  MASTER_DATA as DB_MASTER_DATA,
  PERMIT_WORK_STATUS as DB_PERMIT_WORK_STATUS,
  MASTER_DATA_DOMAIN as DB_MASTER_DATA_DOMAIN,
  PERMIT_ACTIONS_CONFIG as DB_PERMIT_ACTIONS_CONFIG,
  WORK_CATEGORY_KEY_VALUE_CONSTANTS as DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS
} from './db.constants';

export enum UI_SETTINGS {
  DATE_FORMAT = 'dd/MM/yy',
  DATE_TIME_FORMAT = 'dd/MM/yy HH:mm',
}

export enum APP_SETTING {
  DATE_FORMAT = UI_SETTINGS.DATE_FORMAT,
  DATE_TIME_FORMAT = UI_SETTINGS.DATE_TIME_FORMAT,
  USE_GLOBAL_DATE_TIME_FORMAT = DB_APP_SETTING.USE_GLOBAL_DATE_TIME_FORMAT,
}

export enum MASTER_DATA {
  WORK_CATEGORY = DB_MASTER_DATA.WORK_CATEGORY,
  USER_INFO = DB_MASTER_DATA.USER_INFO
}

export enum LOCAL_MASTER_DATA {
  //Local Data
  FILTER_OPERATORS = 'FILTER_OPERATORS'
}

export enum OPERATORS {
  GRATER_THAN = '>',
  LESS_THAN_EQUAL_TO = '<=',
  GREATER_THAN_EQUAL_TO = '>=',
  EQUAL_TO = '=',
  NOT_EQUAL_TO = '!=',
  BETWEEN = 'between',
}


export enum PERMIT_WORK_STATUS {
  PENDING = DB_PERMIT_WORK_STATUS.PENDING,
  GRANTED = DB_PERMIT_WORK_STATUS.GRANTED,
  REFUSED = DB_PERMIT_WORK_STATUS.REFUSED,
  PLANNED = DB_PERMIT_WORK_STATUS.PLANNED
}

export enum MASTER_DATA_DOMAIN {
  WORK_TYPE = DB_MASTER_DATA_DOMAIN.WORK_TYPE,
  WORK_STATUS = DB_MASTER_DATA_DOMAIN.WORK_STATUS,
  PERMIT_STATUS = DB_MASTER_DATA_DOMAIN.PERMIT_STATUS,
  ROAD_CATEGORY = DB_MASTER_DATA_DOMAIN.ROAD_CATEGORY,
  CLOSE_FOOTWAY = DB_MASTER_DATA_DOMAIN.CLOSE_FOOTWAY,
  TRAFFIC_MANAGEMENT_TYPE = DB_MASTER_DATA_DOMAIN.TRAFFIC_MANAGEMENT_TYPE,
  HIGHWAY_AUTORITIES = DB_MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES,
  ORGANIZATIONS = DB_MASTER_DATA_DOMAIN.ORGANIZATIONS,
  CONTRACTOR = DB_MASTER_DATA_DOMAIN.CONTRACTOR,
  WORKSTREAM = DB_MASTER_DATA_DOMAIN.WORKSTREAM,
  DEPARTMENTS = DB_MASTER_DATA_DOMAIN.DEPARTMENTS,
  WORK_CATEGORY = DB_MASTER_DATA_DOMAIN.WORK_CATEGORY,
  WORK_IDENTIFIER = DB_MASTER_DATA_DOMAIN.WORK_IDENTIFIER,
  SPECIAL_DESIGNATION_TYPE = DB_MASTER_DATA_DOMAIN.SPECIAL_DESIGNATION_TYPE,
  SPECIAL_DESIGNATION_PERIODICITY = DB_MASTER_DATA_DOMAIN.SPECIAL_DESIGNATION_PERIODICITY,
  ACTIVITY_TYPE = DB_MASTER_DATA_DOMAIN.ACTIVITY_TYPE,
  FPN_STATUS = DB_MASTER_DATA_DOMAIN.FPN_STATUS,
  CANCELLATION_REASON = DB_MASTER_DATA_DOMAIN.CANCELLATION_REASON,
  REINSTATEMENT_STATUS = DB_MASTER_DATA_DOMAIN.REINSTATEMENT_STATUS,
  REINSTATEMENT_TYPE = DB_MASTER_DATA_DOMAIN.REINSTATEMENT_TYPE,
  USER_ACCESS_CONTRACTOR = DB_MASTER_DATA_DOMAIN.USER_ACCESS_CONTRACTOR,
  USER_ACCESS_ORG = DB_MASTER_DATA_DOMAIN.USER_ACCESS_ORG,
  USER_ACCESS_WROK_STREAM = DB_MASTER_DATA_DOMAIN.USER_ACCESS_WROK_STREAM,
  INSPECTION_STATUS = DB_MASTER_DATA_DOMAIN.INSPECTION_STATUS
}

export const ARR_BOOLEAN_FLAGS = [
  { label: 'Yes', value: true },
  { label: 'No', value: false }
]

export enum ELGIN_MAP_GEOMETRY_TYPE {
  POLYGON = "polygon",
  MARKER = "marker",
  POLYLINE = "polyline"
}

export enum ONE_NETWORK_GEOMETRY_TYPE {
  POLYGON = "POLYGON",
  MARKER = "POINT",
  LINESTRING = "LINESTRING"
}

export enum PERMIT_GEOMETRY_TYPE {
  POLYGON = "Polygon",
  MARKER = "Point",
  POLYLINE = "LineString"
}


export enum PERMIT_ACTIONS_CONFIG {
  PROCEED_TO_PA = DB_PERMIT_ACTIONS_CONFIG.PROCEED_TO_PA,
  CANCEL = DB_PERMIT_ACTIONS_CONFIG.CANCEL,
  START = DB_PERMIT_ACTIONS_CONFIG.START,
  STOP = DB_PERMIT_ACTIONS_CONFIG.STOP,
  ALTERATION = DB_PERMIT_ACTIONS_CONFIG.ALTERATION,
  EXTENSION_REQUEST = DB_PERMIT_ACTIONS_CONFIG.EXTENSION_REQUEST,
  REVERT_START = DB_PERMIT_ACTIONS_CONFIG.REVERT_START,
  REVERT_STOP = DB_PERMIT_ACTIONS_CONFIG.REVERT_STOP,
  REGISTER = DB_PERMIT_ACTIONS_CONFIG.REGISTER,
  NEW_PERMIT = DB_PERMIT_ACTIONS_CONFIG.NEW_PERMIT

}

export enum PERMIT_CONFIRMATION_DIALOG {
  NONE = 0,
  CANCEL_PERMIT = 1,
  PROGRESS_TO_PA = 2,
  COST_SPLIT = 3,
  CHANGE_REQUEST = 4,
  NEW_PERMIT = 5,
  WORK_EXTENSION = 6,
}


export enum CHANGE_REQUEST_DIALOG {
  NONE = 0,
  VIEW = 1,
  EDIT = 2,
  DIFF=3
}

export enum REINSTATEMENT_DIALOG_MODE {
  NONE = 0,
  ADD_OR_EDIT = 1,
  VIEW = 2,
}

export enum WORK_CATEGORY_KEY_VALUE_CONSTANTS {
  MAJOR_KEY = DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS.MAJOR_KEY,
  STANDARD_KEY = DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS.STANDARD_KEY,
  MINOR_KEY = DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS.MINOR_KEY,
  MAJOR_PAA_KEY = DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS.MAJOR_PAA_KEY,
  IMMIDIATE_EMERGENCY_KEY = DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_EMERGENCY_KEY,
  IMMIDIATE_MAJOR_KEY = DB_WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_MAJOR_KEY,
}

export enum CURRENCY_FORMAT {
  USE_CLIENT_CURRENCY_FORMAT = 0, // 0-False, 1-True
  CURRENCY_LOCALE_ID = 'en-GB',
  CURRENCY_CODE = 'GBP',
}


export enum PCPWORKBENCHDIALOG {
  NONE = 0,
  ACCEPT_CHARGE = 1,
  CHALLENGE_PENALTY = 2,
  WRITE_OFF = 3,
  RECORD_NEGOTIATED = 4,
  RECORD_PAYMENT = 5,
  RECORD_INVOICE_AMOUNT = 6,
  REQUEST_PAYMENT_APPROVAL = 7,
  ADD_TRAFFIC_MANAGEMENT_COST = 8
}
export enum PRODUCT_SERVICES {
  WORK_PERMIT_WORKBENCH_PRODUCT_CODE = "Workbench",
  PERMIT_MANAGER_PRODUCT_CODE = "PmtMgr",
  START_STOP_REGISTER_MANAGER_PRODUCT_CODE = "SSRMgr",
  INSPECTIONS_AND_DEFECTS_MANAGER_PRODUCT_CODE = "InsDefMgr",
  COST_AND_PENALTY_MANAGER_PRODUCT_CODE = "CostPenMgr",
  REINSTATEMENT_MANAGER_PRODUCT_CODE = "ReinstMgr",
}

export enum TEXT_TYPE{
  USER = "user",
  STANDARD = "standard",
}

export enum ASSESSMENT_STATUS{
  ASSESSMENT_REFUSED_STATUS = "refused",
  ASSESSMENT_GRANTED_STATUS = "granted",
  ASSESSMENT_MODIFICATION_STATUS = "permit_modification_request"
}

export enum SAVE_AS_DRAFT_POST_ACTION{
  SAVE_AND_NEXT = "SAVE_AND_NEXT",
  SAVE_AND_EXIT = "SAVE_AND_EXIT"
}

export enum COMMENT_ORIGIN {
  PROMOTER = "PROMOTER"
}

export enum GLOBAL_PERSISTANT_DATA{
  JOURNEY = "journey",
  SELECTED_CONTRACTOR = "SELECTED_CONTRACTOR",
  SELECTED_PROMOTER_ORGNISATION = "SELECTED_PROMOTER_ORGNISATION",
  SELECTED_HIGHWAY_AUTHORITY = "SELECTED_HIGHWAY_AUTHORITY"
}

export enum THEMING_VARIABLE{
  ISSVGRENDERPERMMISTION="ISSVGRENDERPERMMISTION",
  ISOPUSLOGORENDERPERMMISIION="ISOPUSLOGORENDERPERMMISIION",
  ISPOWEREDBYIMAGESHOW="ISPOWEREDBYIMAGESHOW"

}