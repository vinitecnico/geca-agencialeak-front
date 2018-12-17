import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// Services
import { StartupConfigService } from './services/startup.config.service';

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
        StartupConfigService
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
