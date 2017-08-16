// ------------------------------------------------------------------------------
// ----- Iparameter.interface.ts -----------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick - USGS Wisconsin Internet Mapping
// purpose: interface for the settings/config.json configuration.resources[i].methods.uriList[i].parameters[i]

export interface Iparameter {
    name: string;
    type: string;
    description: string;
    value: string;
    optional?: boolean;
}