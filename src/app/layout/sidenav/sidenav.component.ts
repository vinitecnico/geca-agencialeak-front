import { Component, Input, OnInit, Inject } from '@angular/core';
import { APPCONFIG } from '../../config';

@Component({
  selector: 'app-sidenav',
  styles: [],
  templateUrl: './sidenav.component.html'
})

export class AppSidenavComponent {
  AppConfig;

  constructor(@Inject('LocalStorage') localStorage) {
    this.AppConfig = APPCONFIG;

    const navCollapsed = localStorage.getItem('fullNav');
    if (navCollapsed) {
      this.AppConfig.navCollapsed = false;
    }
  }

  toggleCollapsedNav() {
    this.AppConfig.navCollapsed = !this.AppConfig.navCollapsed;

    if (!this.AppConfig.navCollapsed) {
      localStorage.setItem('fullNav', 'true');
    } else {
      localStorage.removeItem('fullNav');
    }
  }
}
