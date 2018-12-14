import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common';

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
        MatCheckboxModule
} from '@angular/material';

// Components
import { PeopleComponent } from './components/people/people.component';
import { SharedModule } from '../shared/shared.module';

// Services


// Router
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
    imports: [
        CommonModule,
        RegistrationRoutingModule,
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
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PeopleComponent
    ],
    entryComponents: [
    ],
    providers: []
})
export class RegistrationModule { }
