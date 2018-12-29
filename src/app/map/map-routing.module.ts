import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// component
import { MapGenericComponent } from './components/map-people/map-generic.component';

const routes: Routes = [
    {
        path: 'map',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'peoplemap', component: MapGenericComponent },
            { path: 'fairmap', component: MapGenericComponent },
            { path: 'enterprisemap', component: MapGenericComponent }
        ]
    }
];

export const MapRoutingModule = RouterModule.forChild(routes);
