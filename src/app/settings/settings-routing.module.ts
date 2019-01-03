import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// Website settings
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
    {
        path: 'settings',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'user-list', component: UserListComponent },
            { path: 'user', component: UserSettingsComponent }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);
