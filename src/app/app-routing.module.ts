import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const AppRoutes: Routes = [
    { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    { path: 'app', component: LayoutComponent },
    { path: '**', redirectTo: '/app/dashboard', pathMatch: 'full' },
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
