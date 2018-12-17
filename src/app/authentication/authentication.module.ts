import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Components
import { LoginComponent } from '../authentication/components/login/login.component';

// Services
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
    imports: [
        HttpClientModule,
        HttpModule,
        AuthenticationRoutingModule,
        CommonModule,
        BrowserModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [AuthenticationService, AuthGuard]
})
export class AuthenticationModule { }
