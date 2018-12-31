import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// util
import { SharedModule } from '../shared/shared.module';

// router
import { MapRoutingModule } from './map-routing.module';

// component
import { MapGenericComponent } from './components/map-generic/map-generic.component';

@NgModule({
    imports: [
        CommonModule,
        MapRoutingModule,
        SharedModule
    ],
    declarations: [
        MapGenericComponent
    ],
    exports: [MapGenericComponent],
    entryComponents: [
    ],
    providers: []
})
export class MapModule { }
