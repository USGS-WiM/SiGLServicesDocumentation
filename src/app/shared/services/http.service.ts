// ------------------------------------------------------------------------------
// ----- http.service ----------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
// purpose: service to retrieve data

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ConfigService } from "../../config.service";
import { IconfigObj } from "../interfaces/IConfiObj.interface";


@Injectable()
export class HttpServices {
    private jsonHeader: Headers = new Headers({"Accept": "application/json", "Content-Type": "application/json"});
    private configSettings: IconfigObj;

    constructor(private _configService: ConfigService, private _http: Http){
        this.configSettings = this._configService.getConfiguration().configuration;
    }

    // ------------ GETS ---------------------------
    public getEntities(url:string){
        let options = new RequestOptions({headers: this.jsonHeader});
        return this._http.get(this.configSettings.services + url, options)
            .map(response => <Array<any>>response.json())
            .catch(this.errorHandler)
    }

    private errorHandler(error: Response | any) {        
  /*      return <any>error.json();
        if (error._body !== "")
            error._body = JSON.parse(error._body);*/

	    return Observable.throw(error);
    }
}