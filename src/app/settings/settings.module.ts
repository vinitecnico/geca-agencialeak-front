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
} from '@angular/material';

// Components
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { SharedModule } from '../shared/shared.module';

// Services


// Router
import { UserRoutingModule } from './settings-routing.module';

@NgModule({
    imports: [
        UserRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        UserSettingsComponent
    ],
    entryComponents: [
    ],
    providers: []
})
export class UserSettingsModule { }