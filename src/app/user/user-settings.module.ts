import { NgModule } from '@angular/core';
import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule
} from '@angular/material';

// Components
import { UserSettingsComponent } from './components/settings/user-settings.component';

// Services


// Router
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [
        UserRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [
        UserSettingsComponent
    ],
    entryComponents: [
    ],
    providers: []
})
export class UserSettingsModule { }
