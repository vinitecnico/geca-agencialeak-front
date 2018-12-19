import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// component
import { PeopleComponent } from './components/people/people.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { FairComponent } from './components/fair/fair.component';
import { CollegeComponent } from './components/college/college.component';
import { FairListComponent } from './components/fair-list/fair-list.component';


const routes: Routes = [
    {
        path: 'registration',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'people', component: PeopleComponent },
            { path: 'enterprise', component: EnterpriseComponent },
            { path: 'fair', component: FairComponent},
            { path: 'fair-list', component: FairListComponent},
            { path: 'college', component: CollegeComponent}
        ]
    }
];

export const RegistrationRoutingModule = RouterModule.forChild(routes);
