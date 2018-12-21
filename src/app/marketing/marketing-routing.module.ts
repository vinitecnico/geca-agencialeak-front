import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// component
import { EmailComponent } from './components/email/email.component';


const routes: Routes = [
    {
        path: 'marketing',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'email', component: EmailComponent }
        ]
    }
];

export const MarketingRoutingModule = RouterModule.forChild(routes);
