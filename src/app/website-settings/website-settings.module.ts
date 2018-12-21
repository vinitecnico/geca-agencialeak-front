import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule
} from '@angular/material';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Services


// Router
import { WebsiteRoutingModule } from './website-routing.module';

// sub-menu
import { MapModule } from '../map/map.module';

@NgModule({
    imports: [
        WebsiteRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MapModule
    ],
    declarations: [
        DashboardComponent
    ],
    entryComponents: [
    ],
    providers: []
})
export class WebsiteSettingsModule { }
