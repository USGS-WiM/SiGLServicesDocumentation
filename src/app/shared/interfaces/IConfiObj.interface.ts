// ------------------------------------------------------------------------------
// ----- IconfigObj.interface.ts -----------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick - USGS Wisconsin Internet Mapping
// purpose: interface for the settings/config.json configuration

import { Iresource } from "./IResource.interface";

export interface IconfigObj {
    services: string;
    mapper: string;
    application: string;
    homepagetitle: string;
    resources: Array<Iresource>;
}