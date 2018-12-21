import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../authentication/services/auth-guard.service';

// component
import { MapPeopleComponent } from './components/map-people/map-people.component';


const routes: Routes = [
    {
        path: 'map',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'peoplemap', component: MapPeopleComponent }
        ]
    }
];

export const MapRoutingModule = RouterModule.forChild(routes);
