import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule
} from '@angular/material';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Services
import { DashboardService } from './services/dashboard.services';

// Router
import { WebsiteRoutingModule } from './website-routing.module';

// sub-menu
import { MapModule } from '../map/map.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        WebsiteRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatStepperModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTooltipModule,
        MapModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DashboardComponent
    ],
    entryComponents: [
    ],
    providers: [DashboardService]
})
export class WebsiteSettingsModule { }
