import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// Website settings
import { InformationComponent } from '../website-settings/components/information/information.component';


const routes: Routes = [
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'information', component: InformationComponent }
        ]
    }
];

export const WebsiteRoutingModule = RouterModule.forChild(routes);
