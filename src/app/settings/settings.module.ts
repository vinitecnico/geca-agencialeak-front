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
        ReactiveFormsModule
    ],
    declarations: [
        UserSettingsComponent
    ],
    entryComponents: [
    ],
    providers: []
})
export class UserSettingsModule { }
