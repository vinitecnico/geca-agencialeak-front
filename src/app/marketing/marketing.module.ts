import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

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

// util
import { SharedModule } from '../shared/shared.module';

// router
import { MarketingRoutingModule } from './marketing-routing.module';

// component
import { EmailComponent } from './components/email/email.component';

@NgModule({
    imports: [
        CommonModule,
        MarketingRoutingModule,
        SharedModule,
        NgxEditorModule,
        FormsModule,
        ReactiveFormsModule,
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
    ],
    declarations: [
        EmailComponent
    ],
    exports: [],
    entryComponents: [
    ],
    providers: []
})
export class MarketingModule { }
