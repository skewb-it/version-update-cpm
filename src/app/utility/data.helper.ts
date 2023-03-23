import { truncateSync } from 'fs';
import { PERMIT_WORK_STATUS, PRODUCT_SERVICES } from '../constants/app-repo.constants';
import { PERMIT_ACTIONS_CONFIG } from '../constants/db.constants';

export class DataHelper {
    static booleanToUserText(value) {
        return value ? "Yes" : "No";
    }

    static removeExtensionFromName(value) {
        if (value) {
            return value.split('.').slice(0, -1).join('.')
        }
        return null;
    }

    static getFileExetension(value) {
        if(value){
            return value.split('.').pop();
        }
        return null;
    }

    static isImage(value) {
        let imageextenstions:any[] = ["jpg", "jpeg", "bmp", "gif", "png"]
        if(value){
            return imageextenstions.indexOf(value) > -1;
        }
        return false;
    }

    static getPermitIconURL(value) {
        let icon: string;
        switch (value) {
            case 1:
                icon = "red";
                break;
            case 2:
                icon = "yellow";
                break;
            case 3:
                 icon = "green";
                break;
            default:
                icon =  "gray";
                break;
        }
        return `assets/images/flags/${icon}.png`;
    }

    static getWorkStatusClass(value) {
        let cssClass: string;
        switch (value) {
            case PERMIT_WORK_STATUS.PENDING:
                cssClass = "status-label-pending";
                break;
            case PERMIT_WORK_STATUS.GRANTED:
                cssClass = "status-label-granted";
                break;
            case PERMIT_WORK_STATUS.REFUSED:
                cssClass = "status-label-refused";
                break;
            default:
                cssClass = "mb-0";
                break;
        }
        return cssClass;
    }

    static findProp(obj, prop, defval?){
        if (typeof defval == 'undefined') defval = null;
        prop = prop.split('.');
        for (var i = 0; i < prop.length; i++) {
            if(typeof obj[prop[i]] == 'undefined')
                return defval;
            obj = obj[prop[i]];
        }
        return obj;
    }

   static units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   static FormatSize(x)
   {
     let l = 0, n = parseInt(x, 10) || 0;
     while(n >= 1024 && ++l){
       n = n/1024;
       } 
     return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + DataHelper.units[l]);
   }

}