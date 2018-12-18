import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// Services
import { StartupConfigService } from './services/startup.config.service';
import { ZipcodeService } from './services/zipcode.service';

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
        StartupConfigService,
        ZipcodeService
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
