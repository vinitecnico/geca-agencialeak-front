import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { QuillModule } from 'ngx-quill';
import { AlertModule } from 'ngx-alerts';


// Components
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';

// Sub modules
import { AuthenticationModule } from './authentication/authentication.module';
import { WebsiteSettingsModule } from './website-settings/website-settings.module';
import { UserSettingsModule } from './settings/settings.module';
import { RegistrationModule } from './registration/registration.module';
import { SharedModule } from './shared/shared.module';
import { MapModule } from './map/map.module';
import { MarketingModule } from './marketing/marketing.module';

// Layout
import { LayoutComponent } from './layout/layout.component';

// Pages
import { HomeComponent } from './home/home.component';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatPaginatorIntl,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

@NgModule({
  declarations: [
    AppComponent,
    // Layout
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatAutocompleteModule,
    AuthenticationModule,
    LayoutModule,
    UserSettingsModule,
    WebsiteSettingsModule,
    RegistrationModule,
    SharedModule,
    MapModule,
    MarketingModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot({
      requestFilters: []
    }),
    QuillModule,
    AlertModule.forRoot()
  ],
  providers: [
    { provide: 'LocalStorage', useFactory: getLocalStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
