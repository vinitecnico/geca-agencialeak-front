import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import {
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatIconModule
} from '@angular/material';

// Components
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MessageComponent } from './components/message/message.component';
import { ZipcodeComponent } from './components/zipcode/zipcode.component';
import { MapComponent } from './components/map/map.component';

// Services
import { StartupConfigService } from './services/startup.config.service';
import { ZipcodeService } from './services/zipcode.service';
import { UtilsService } from './services/utils.service';
import { MapService } from './services/map.service';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatIconModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAdyvRIRT1iMFRzE4v8BzfGXc-Oc9OFTwk'
        })
    ],
    declarations: [
        BreadcrumbComponent,
        ZipcodeComponent,
        MessageComponent,
        MapComponent
    ],
    exports: [
        BreadcrumbComponent,
        ZipcodeComponent,
        MessageComponent,
        MapComponent
    ],
    providers: [
        StartupConfigService,
        ZipcodeService,
        UtilsService,
        MapService
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
