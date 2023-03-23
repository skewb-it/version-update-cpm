export enum APP_SETTING {
  DATE_FORMAT = 'DATE_FORMAT',
  DATE_TIME_FORMAT = 'datetimeformat',
  USE_GLOBAL_DATE_TIME_FORMAT = 'useglobaldatetimeformat'
}


export enum EVENT_NAME {
  ON_ITEM_CLICK = "item_click",
}

export enum MASTER_DATA {
  WORK_CATEGORY = 'WORK_CATEGORY',
  USER_INFO = 'USER_INFO',
}

export enum HELPER_TEXT_DATA_DOMAIN {
  QUICK_FILTER = 'QUICK_FILTER',
  SPECIAL_DESIGNATION_TYPE = "SPECIAL_DESIGNATION_TYPE"
}

export enum PERMIT_WORK_STATUS {
  PENDING = 'pending',
  GRANTED = 'granted',
  REFUSED = 'refused',
  PLANNED = 'planned'
}

export enum MASTER_DATA_DOMAIN {
  WORK_TYPE = "WORK_TYPE",
  WORK_STATUS = "WORK_STATUS",
  PERMIT_STATUS = "PERMIT_STATUS",
  ROAD_CATEGORY = "ROAD_CATEGORY",
  CLOSE_FOOTWAY = "CLOSE_FOOTWAY",
  TRAFFIC_MANAGEMENT_TYPE = "TRAFFIC_MANAGEMENT_TYPE",
  COLLABORATION_TYPE = "COLLABORATION_TYPE",
  HIGHWAY_AUTORITIES = "HIGHWAY_AUTORITIES",
  ORGANIZATIONS = "ORGANIZATIONS",
  CONTRACTOR = "CONTRACTOR",
  WORKSTREAM="WORKSTREAM",
  DEPARTMENTS = "DEPARTMENTS",
  WORK_CATEGORY = "WORK_CATEGORY",
  WORK_IDENTIFIER = "WORK_IDENTIFIER",
  SPECIAL_DESIGNATION_TYPE = "SPECIAL_DESIGNATION_TYPE",
  SPECIAL_DESIGNATION_PERIODICITY = "SPECIAL_DESIGNATION_PERIODICITY",
  LOCATION_TYPE = "LOCATION_TYPE",
  ACTIVITY_TYPE = "ACTIVITY_TYPE",
  FPN_STATUS = "FPN_STATUS",
  CANCELLATION_REASON = "CANCELLATION_REASON",
  REINSTATEMENT_STATUS = "REINSTATEMENT_STATUS",
  REINSTATEMENT_TYPE = "REINSTATEMENT_TYPE",
  USER_ACCESS_CONTRACTOR = "USER_ACCESS_CONTRACTOR",
  USER_ACCESS_ORG = "USER_ACCESS_ORG",
  USER_ACCESS_WROK_STREAM = "USER_ACCESS_WROK_STREAM",
  INSPECTION_STATUS = "INSPECTION_STATUS"
}


export enum PERMIT_ACTIONS_CONFIG {
  PROCEED_TO_PA = "progress-to-pa",
  CANCEL = "cancel",
  START = "start",
  STOP = "stop",
  ALTERATION = "alteration",
  EXTENSION_REQUEST = "extension-request",
  REVERT_START = "revert-start",
  REVERT_STOP = "revert-stop",
  REGISTER = "register",
  NEW_PERMIT = "new-permit",
  ADD_REINSTATEMENT = "add-reinstatement",
  ADD_NEW_COMMENT = "add-new-comment",
  UPLOAD = "upload",
  EDIT_PERMIT = "edit-permit",
  DELETE_PERMIT = "delete-permit",
  VIEW_PERMIT = "view-permit",
  EDIT_REINSTATEMENT = "edit-reinstatement",
  DELETE_REINSTATEMENT = "delete-reinstatement",
  VIEW_REINSTATEMENT = "view-reinstatement",
  CREATE_PERMIT = "create-permit"
}

export enum WORK_CATEGORY_KEY_VALUE_CONSTANTS {
  MAJOR_KEY = "major",
  STANDARD_KEY = "standard",
  MINOR_KEY = "minor",
  MAJOR_PAA_KEY = "major_paa",
  IMMIDIATE_EMERGENCY_KEY = "immediate_emergency",
  IMMIDIATE_MAJOR_KEY = "immidiate_major"
  // immediate_urgent
}

export enum SUGGESTED_CONDITIONS {
  MULTI_WAY_SIGNALS = "multi_way_signals",
  TWO_WAY_SIGNALS = "two_way_signals",
  ROAD_CLOSURE = "road_closure",
  TTRO_REQUIRED_FLAG = "true",

}

export enum REINSTATEMENT_TYPE {
  EXCAVATION = "excavation",
}

export enum FPN_STATUS{
  WITHDRAWN = 'Withdrawn'
  }
export enum PERMIT_STATUS {
  GRANTED = "granted"
}

export enum WORK_STATUS {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
}

export enum WORK_TYPE {
  MAJOR = "major",
  MINOR = "minor",
  STANDARD = "standard",
  PAA = "paa",
}

export enum WORK_STREAM {
  POWER = "Power",
  GAS = "Gas"
}

export enum MANAGEMENT_DB_MATRIX_FILTER {
  FPNS_OUTSTANDING = "fpns_outstanding",
  FPNS_DUETHISWEEK = "fpns_duethisweek",
  FPNS_TOTAL = "fpns_total",
  DEFECTS_OUTSTANDING = "defects_outstanding",
  DEFECTS_DUETHISWEEK = "defects_duethisweek",
  DEFECTS_TOTAL = "defects_total",
  REGISTRATIONS_OUTSTANDING = "registrations_outstanding",
  REGISTRATIONS_DUETHISWEEK = "registrations_duethisweek",
  REGISTRATIONS_TOTAL = "registrations_total",
}
