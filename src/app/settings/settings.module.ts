import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    MatTooltipModule,
    MatAutocompleteModule
} from '@angular/material';

// Components
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';

// Services
import { UserService } from './services/user.service';

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
        MatAutocompleteModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        UserSettingsComponent,
        UserListComponent
    ],
    entryComponents: [
    ],
    providers: [UserService]
})
export class UserSettingsModule { }
