import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// Website settings
import { UserSettingsComponent } from './components/user-settings/user-settings.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'user-settings', component: UserSettingsComponent }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);
