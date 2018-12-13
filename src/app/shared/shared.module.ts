import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
    imports: [
        RouterModule
    ],
    declarations: [
        BreadcrumbComponent
    ],
    exports: [
        BreadcrumbComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
