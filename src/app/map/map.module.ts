import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

// util
import { SharedModule } from '../shared/shared.module';

// router
import { MapRoutingModule } from './map-routing.module';

// component
import { MapPeopleComponent } from './components/map-people/map-people.component';

// services
import { MapService } from './services/map.service';


@NgModule({
    imports: [
        CommonModule,
        MapRoutingModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDKSvQJMTn0Qotl8b3gWsW9EE5bB_pSKA4'
        })
    ],
    declarations: [
        MapPeopleComponent
    ],
    exports: [MapPeopleComponent],
    entryComponents: [
    ],
    providers: [MapService]
})
export class MapModule { }
