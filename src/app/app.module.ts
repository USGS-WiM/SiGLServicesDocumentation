// ------------------------------------------------------------------------------
// --------- app.module ---------------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
// purpose: app module for web services documentation interface

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MainviewComponent } from "./mainview/mainview.component";
import { PageNotFoundComponent } from "./not-found/not-found.component";
import { ConfigService } from "./config.service";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app.routing.module";
import { MapService } from "./mainview/map.service";

export function ConfigLoader(configService: ConfigService) {
  //returns externally referenced config file for use in this application	
	return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [ AppComponent, MainviewComponent, PageNotFoundComponent],
  imports: [ BrowserModule, HttpModule, FormsModule, AppRoutingModule, SharedModule.forRoot() ],
  providers: [MapService, ConfigService,
        { provide: APP_INITIALIZER, useFactory: ConfigLoader, deps: [ConfigService], multi:true}
      ],
  bootstrap: [AppComponent]
})

export class AppModule { }
/*
The first line makes ConfigService class available to Angular2.
The second line uses APP_INITIALIZER to execute ConfigLoader method before application startup. 
The 'multi: true' is being used because an application can have more than one line of APP_INITIALIZER.
*/