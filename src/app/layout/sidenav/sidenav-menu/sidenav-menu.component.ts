import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-sidenav-menu',
  styles: [],
  templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent implements OnInit {
  showWebsiteOptions: Boolean = false;
  showHotelCustomization: Boolean = false;
  hasHotelCustomization: Boolean = this.checkIfHasHotelCustomization();
  OperatorModules: any;

  constructor(@Inject('LocalStorage') localStorage, private router: Router,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.OperatorModules) {
      this.showHotelCustomization = this.OperatorModules.habilitarGerenciamentoHotel;
    }
    // else {
    //   this.operatorService.GetModules().subscribe((response) => {
    //     this.OperatorModules = response;
    //     this.showHotelCustomization = response.habilitarGerenciamentoHotel;
    //     this.operatorService.currentHasClient.subscribe((data) => {
    //       this.hasHotelCustomization = this.checkIfHasHotelCustomization();
    //     });
    //   });
    // }
    this.loginWebsiteSettings();
  }

  freePageManagement() {
    const pages = ['hotel-customization', 'home', 'report'];
    let hasPageName = false;
    _.each(pages, (x) => {
      if (this.router.url.indexOf(x) > -1) {
        hasPageName = true;
      }
    });
    return hasPageName;
  }

  loginWebsiteSettings(configSite?: any): void {
    if (this.checkIfHasClientId()) {
      this.showWebsiteOptions = true;
      return;
    }

    if (this.checkIfHasHotelCustomization() && this.freePageManagement() && !configSite) {
      return;
    }

    this.router.navigateByUrl('/app/cms-management');
  }

  checkIfHasHotelCustomization(): boolean {
    const authData = JSON.parse(localStorage.getItem('authData'));
    return false;
  }

  checkIfHasClientId(): boolean {
    const clientData = localStorage.getItem('clientData');
    if (clientData) {
      return true;
    }

    return false;
  }

}
