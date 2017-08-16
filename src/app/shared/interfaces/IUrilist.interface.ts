// ------------------------------------------------------------------------------
// ----- IUrilist.interface.ts -----------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick - USGS Wisconsin Internet Mapping
// purpose: interface for the settings/config.json configuration.resources[i].methods.uriList

import { Iparameter } from "./IParameter.interface";

export interface Iurilist {
    uri: string;
    newURL: string;
    description: string;
    id: string;
    parameters: Array<Iparameter>;
    availableMedia: Array<string>;
    selectedMedia: string;
    showMap?: boolean;
}