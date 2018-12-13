import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// Website settings
import { PeopleComponent } from './components/people/people.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'people', component: PeopleComponent }
        ]
    }
];

export const RegistrationRoutingModule = RouterModule.forChild(routes);
