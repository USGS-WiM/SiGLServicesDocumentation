// ------------------------------------------------------------------------------
// -------- app.routing.module --------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: routes for the resource clicked

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainviewComponent } from "./mainview/mainview.component";
import { AppComponent } from "./app.component";
import { ConfigService } from "./config.service";
import { environment } from "../environments/environment";
import { IconfigObj } from "./shared/interfaces/IConfiObj.interface";
import { PageNotFoundComponent } from "./not-found/not-found.component";

const appRoutes: Routes = [
    {   path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainviewComponent
    },    
    {
        path: '**', 
        
        component: MainviewComponent
    },
    {
        path: 'notFound',
        component: PageNotFoundComponent,
        pathMatch: 'full'
    }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
