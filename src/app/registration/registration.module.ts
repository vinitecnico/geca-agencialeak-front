import { NgModule } from '@angular/core';
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
        MatRadioModule
} from '@angular/material';

// Components
import { PeopleComponent } from './components/people/people.component';
import { SharedModule } from '../shared/shared.module';

// Services


// Router
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
    imports: [
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
