import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule
} from '@angular/material';

// Components
import { InformationComponent } from './components/information/information.component';

// Services


// Router
import { WebsiteRoutingModule } from './website-routing.module';

@NgModule({
    imports: [
        WebsiteRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [
        InformationComponent
    ],
    entryComponents: [
    ],
    providers: []
})
export class WebsiteSettingsModule { }
