// ------------------------------------------------------------------------------
// ----- shared.module -----------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick - USGS Wisconsin Internet Mapping
// purpose: module for the sharing of global stuff 

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PathService } from "./services/path.service";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpServices } from "./services/http.service";
import { JsonFormatterComponent } from "./components/json-formatter.component";


@NgModule({
  declarations: [ JsonFormatterComponent],
  exports: [ NgbModule, JsonFormatterComponent ],
  imports: [ CommonModule, BrowserAnimationsModule, NgbModule.forRoot() ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ PathService, HttpServices ]
    }
  }

}
