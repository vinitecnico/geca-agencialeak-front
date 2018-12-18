import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

// Services
import { StartupConfigService } from './services/startup.config.service';
import { ZipcodeService } from './services/zipcode.service';
import { ZipcodeComponent } from './components/zipcode/zipcode.component';


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
        MatIconModule
    ],
    declarations: [
        BreadcrumbComponent,
        ZipcodeComponent
    ],
    exports: [
        BreadcrumbComponent,
        ZipcodeComponent
    ],
    providers: [
        StartupConfigService,
        ZipcodeService
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
