import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// component
import { PeopleComponent } from './components/people/people.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { FairComponent } from './components/fair/fair.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'people', component: PeopleComponent },
            { path: 'enterprise', component: EnterpriseComponent },
            { path: 'fair', component: FairComponent}
        ]
    }
];

export const RegistrationRoutingModule = RouterModule.forChild(routes);
