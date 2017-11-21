// ------------------------------------------------------------------------------
// --------- app.component ------------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: app component main shell that holds nav, sidebar, and mainview

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MainviewComponent } from "./mainview/mainview.component";
import { IconfigObj } from "./shared/interfaces/IConfiObj.interface";
import { ConfigService } from "./config.service";
import { Iurilist } from "./shared/interfaces/IUrilist.interface";
import { Iresource } from "./shared/interfaces/IResource.interface";
import { PathService } from "./shared/services/path.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('acc') accordion;
	public title: string;
	public configSettings: IconfigObj;
	public selectedAccordion: string; // when they open accordion, want to toggle caret

	constructor(private _configService: ConfigService, private _route: ActivatedRoute,
			private _router: Router, private _pathService: PathService) {
		this.configSettings = this._configService.getConfiguration().configuration;
	}
	ngOnInit(){
		this.selectedAccordion = "";
		this.title = this.configSettings.homepagetitle + " Documentation";
		this._pathService.getPath().subscribe((path:string) => {
			if (path !== "home"){
				if (this.accordion.activeIds[0] !== path) {
					this.accordion.activeIds = [path];
					this.selectedAccordion = path;
				}
			} else {
				this.accordion.activeIds = [];
				this.selectedAccordion = "";
			}
		});

	}

	public showMobileMenu(){
		var appMenu = document.getElementById("appMenu");

		if(appMenu.style.display == "none"){
			appMenu.style.display = "block";
			document.getElementById("mobileMenuText").innerHTML = "Close";
			document.getElementById("mobileMenuIcon").classList.remove("fa-bars");
			document.getElementById("mobileMenuIcon").classList.add("fa-times");

		}else{
			appMenu.style.display = "none";
			document.getElementById("mobileMenuText").innerHTML = "Menu";
			document.getElementById("mobileMenuIcon").classList.add("fa-bars");
			document.getElementById("mobileMenuIcon").classList.remove("fa-times");
		}
	}

	public getName(resName: string) {
		return resName.replace(/ /g,'');
	}
	public getLink(url: Iurilist){
		return url.id.replace(/ /g,'');
	}

	public beforeAccChange(e){
		// if the panel is newly being opened from another panel
		if (e.panelId !== this.selectedAccordion && e.nextState)
			this.selectedAccordion = e.panelId;
		else this.selectedAccordion = "";

    }
}
