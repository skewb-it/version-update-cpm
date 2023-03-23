import { Injectable, OnDestroy } from '@angular/core';
import { AppRepoModel } from 'src/app/models/common/app-repo';


@Injectable({
    providedIn: 'root'
})

export class AppRepoService implements OnDestroy {

    static _instance: AppRepoService;

    appRepo: AppRepoModel;
   
    constructor() {
        AppRepoService._instance = this;

        this.appRepo = new AppRepoModel();
    }

    
    ngOnDestroy(): void {

    }
    
}