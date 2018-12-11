import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutService } from './layout/services/layout.service';
import { APPCONFIG } from './config';
import * as jQuery from 'jquery';

// 3rd
// import 'styles/material2-theme.scss';
// import 'styles/bootstrap.scss';
// custom
// import 'styles/layout.scss';
// import 'styles/theme.scss';
// import 'styles/ui.scss';
// import 'styles/app.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LayoutService]
})
export class AppComponent implements OnInit {
  public AppConfig: any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
