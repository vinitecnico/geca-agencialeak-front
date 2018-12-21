import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';

// util
import { SharedModule } from '../shared/shared.module';

// router
import { MapRoutingModule } from './map-routing.module';

// component
import { MapPeopleComponent } from './components/map-people/map-people.component';

// services
import { MapService } from './components/services/map.service';


@NgModule({
    imports: [
        CommonModule,
        MapRoutingModule,
        SharedModule
    ],
    declarations: [
        MapPeopleComponent
    ],
    entryComponents: [
    ],
    providers: [MapService]
})
export class MapModule { }
