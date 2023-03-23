import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StartUpService } from './startup.service';

@Injectable({
    providedIn: 'root'
})
export class ResolverService implements Resolve<Promise<any>> {

    constructor(
        private _startUpService: StartUpService
    ) { }


    resolve() {
        return this._startUpService.Init();
    }
}