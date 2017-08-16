// ------------------------------------------------------------------------------
// ----- Config.interface.ts -----------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick - USGS Wisconsin Internet Mapping
// purpose: interface for the externally referenced config file settings/config.json configuration

import { IconfigObj } from "./IConfiObj.interface";

export interface IConfig {
    configuration: IconfigObj;    
}