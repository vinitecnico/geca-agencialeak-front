import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

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
import { PeopleComponent } from './components/people/people.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { FairComponent } from './components/fair/fair.component';
import { CollegeComponent } from './components/college/college.component';
import { FairListComponent } from './components/fair-list/fair-list.component';
import { CollegeListComponent } from './components/college-list/college-list.component';
import { EnterpriseListComponent } from './components/enterprise-list/enterprise-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';

// Services
import { FairService } from './services/fair.service';
import { CollegeService } from './services/college.service';
import { EnterpriseService } from './services/enterprise.service';
import { PeopleService } from './services/people.service';

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
        MatAutocompleteModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        PeopleComponent,
        EnterpriseComponent,
        FairComponent,
        CollegeComponent,
        FairListComponent,
        CollegeListComponent,
        EnterpriseListComponent,
        PeopleListComponent
    ],
    entryComponents: [
    ],
    providers: [FairService, CollegeService, EnterpriseService, PeopleService]
})
export class RegistrationModule { }
