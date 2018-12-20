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
        MatCheckboxModule,
        MatTooltipModule
} from '@angular/material';

// Components
import { PeopleComponent } from './components/people/people.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { SharedModule } from '../shared/shared.module';

// components
import { RegistrationRoutingModule } from './registration-routing.module';
import { FairComponent } from './components/fair/fair.component';
import { CollegeComponent } from './components/college/college.component';
import { FairListComponent } from './components/fair-list/fair-list.component';
import { CollegeListComponent } from './components/college-list/college-list.component';
import { EnterpriseListComponent } from './components/enterprise-list/enterprise-list.component';

// Services
import { FairService } from './services/fair.service';
import { CollegeService } from './services/college.service';
import { EnterpriseService } from './services/enterprise.service';

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
        MatTooltipModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PeopleComponent,
        EnterpriseComponent,
        FairComponent,
        CollegeComponent,
        FairListComponent,
        CollegeListComponent,
        EnterpriseListComponent
    ],
    entryComponents: [
    ],
    providers: [FairService, CollegeService, EnterpriseService]
})
export class RegistrationModule { }
