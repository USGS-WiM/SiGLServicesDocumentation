// ------------------------------------------------------------------------------
// ----- mainview.component -----------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: main component that shows home page and resource information

import * as L from 'leaflet';
import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfigService } from "../config.service";
import { IConfig } from "../shared/interfaces/IConfig.interface";
import { Iresource } from "../shared/interfaces/IResource.interface";
import { IconfigObj } from "../shared/interfaces/IConfiObj.interface";
import { Iurilist } from "../shared/interfaces/IUrilist.interface";
import { Iparameter } from "../shared/interfaces/IParameter.interface";
import { HttpServices } from "../shared/services/http.service";
import { MapService } from "./map.service";
import { PathService } from "../shared/services/path.service";


@Component({
    templateUrl: './mainview.component.html',
    styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {
    @ViewChild('map') mapContainer;
    public thisRoute: string;
    public configSettings: IconfigObj; // external assets/config.json
    public selectedResource: Iresource; // the selected resource object
    public selectedUri: Iurilist; // the selected uri object of the resource
    public isSelected: boolean; // resource selected or home page
    public resourceName: string; // resource.name gets populated via route
    public downloadable: boolean; // file download endpoints, don't show load response button
    public waitCursor: boolean; // spin as resource is gotten
    public requestResults: any; // response from get request
    public gotResponse: boolean; // set to true when response has arrived in geojson to allow 'Show response in map' button to be enabled
    public map: L.Map; // leaflet map
    public geoJsonResponseLayer: L.FeatureGroup;
    public showMap: boolean; // set to true when 'Show response on map' is clicked to change styling of map container

    constructor(private _configService: ConfigService, private _route: ActivatedRoute,
        private _router: Router, private _httpService: HttpServices, private _mapService: MapService,
        private _pathService: PathService, private _cdRef:ChangeDetectorRef) {
        this.configSettings = this._configService.getConfiguration().configuration;
    }
    ngAfterViewInit(){
        if (this.thisRoute !== 'home'){
            this.map = L.map(this.mapContainer.nativeElement, {
                attributionControl: false,
                center: L.latLng(45, -90),
                zoom: 4,
                //   minZoom: 4,
                //   maxZoom: 19,
                layers: [this._mapService.baseMaps.Topo]
            });
        }
    }
    ngOnInit() {
        this.requestResults = null;

        this._route.url.subscribe((urlSeg) => {
            this.gotResponse = false;
            if (this.map) {
                if (this.map.hasLayer(this.geoJsonResponseLayer)) {
                     this.map.removeLayer(this.geoJsonResponseLayer);
                     this.map.setView(L.latLng(45, -90), 4);
                }
            }
            this.showMap = false;
            this.isSelected = false;
            this.downloadable = false;
            this.waitCursor = false;
            if (urlSeg.length > 1) {
                this.resourceName = urlSeg[0].path;    //ex: '/Contacts'
                this._pathService.setpath(this.resourceName);
                //get the selected resource
                this.selectedResource = this.configSettings.resources.filter(res => { return res.name.replace(/ /g, '') == this.resourceName })[0];
                if (this.selectedResource) {
                    this.isSelected = true;
                    this.selectedResource.methods.uriList.forEach((uri) => {
                        if (uri.id.replace(/ /g, '') == urlSeg[1].path) {
                            this.thisRoute = urlSeg[1].path;
                            this.selectedUri = uri;
                            this.updateNewUri(); // updates the REST Query URL
                        }
                    });
                    if (!this.selectedUri)
                        this._router.navigate(['notFound']);
                } else {
                    // invalid url, send to not-found
                    this._router.navigate(['notFound']);
                }
            } else if (urlSeg[0].path == 'home') {
                //home page
                 this._pathService.setpath(urlSeg[0].path);
                this.thisRoute = urlSeg[0].path;
            } else {
                // invalid url, send to not-found
                this._router.navigate(['notFound']);
            }
        });
    } // end ngOnInit()

    // each time they change the selectedMedia or a parameter
    public updateNewUri() {
        this.requestResults = undefined; this.gotResponse = false;
        let inputParams: Array<any> = [this.selectedUri.selectedMedia];
        this.selectedUri.parameters.forEach((p: Iparameter) => {
            inputParams.push(p.value);
        })

        this.selectedUri.newURL = this.formatString(this.selectedUri.uri, inputParams);
        //for file download endpoints, don't show button to load response in output box
        if (this.selectedUri.availableMedia != undefined) {
            if (this.selectedUri.availableMedia.length == 0)
                this.downloadable = true;
        }
    }

    // go hit endpoint and return response
    public loadResponse() {
        this.waitCursor = true;
        this._httpService.getEntities(this.selectedUri.newURL).subscribe((response) => {
            this.gotResponse = true;
            this.waitCursor = false;
            this.requestResults = response;
            if (this.selectedUri.showMap) this.map.invalidateSize();
        }, (error) =>{
            this.requestResults = "(" + error.status + ") " + error.statusText;
            this.waitCursor = false;
        })
    }
    // format the uri to remove {#} with parameter given
    private formatString(uri, inputs): string {
        let formattedURI: string = "";
        var args = inputs;
        return uri.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    }
    // if geojson, can view response on map
    public showResponseOnMap() {
        let smallIcon = new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
            iconSize:    [25, 41],
            iconAnchor:  [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize:  [41, 41]
        });
            //set map
            this.showMap = true;

            this.geoJsonResponseLayer = L.geoJSON(this.requestResults, {
                onEachFeature: function(feature, layer){
                    let popup = L.popup();
                    layer.bindPopup('SITE ID: ' + feature.properties['site_id']); // UPDATE HERE what properties you want to show
                },
                pointToLayer: function(feature, latlng) {
                    return L.marker(latlng, {
                        icon: smallIcon
                    });
                }
            }).addTo(this.map);
        //    this.map.invalidateSize();

            this.map.fitBounds(this.geoJsonResponseLayer.getBounds(), {padding: [50,50]});

    }
    // update the #map height when moving between resources (those that need map and those that don't)
    public getMapClass(){
        if (this.selectedUri.showMap && this.map){
            this.map.invalidateSize();
            return 'mapView';
        } else return '';
    }

    // need to detect changes because getMapClass() changes the dom. without this causes changedetection error
    ngAfterViewChecked()
	{
		this._cdRef.detectChanges();
	}
}
