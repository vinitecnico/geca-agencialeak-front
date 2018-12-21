import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// Website settings
import { DashboardComponent } from '../website-settings/components/dashboard/dashboard.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ]
    }
];

export const WebsiteRoutingModule = RouterModule.forChild(routes);
