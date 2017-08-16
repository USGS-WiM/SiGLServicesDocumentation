// ------------------------------------------------------------------------------
// ----- loading.service..ts -----------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick - USGS Wisconsin Internet Mapping
// purpose: loading div

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PathService {

    constructor() {}
    
    // show/hide loading div
    private _pathSubj: Subject<string> = new Subject<string>();
    // setter
    public setpath(val:string) {
        this._pathSubj.next(val);
    }
    
    //getter
    public getPath(): Observable<string> { // getter (loggedInRole)    
        return this._pathSubj.asObservable();
    }    
}