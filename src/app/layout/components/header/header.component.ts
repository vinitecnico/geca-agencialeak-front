import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../../config';
// import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material';

// service
// import { OperatorService } from '../../../shared/services/operator.service';

@Component({
  selector: 'app-header',
  styles: [],
  templateUrl: './header.component.html',
  // providers: [LocalStorageService]
})

export class AppHeaderComponent implements OnInit {
  public AppConfig: any;
  public currentLang: string;

  constructor(
    // private localStorageService: LocalStorageService,
    private router: Router,
    private adapter: DateAdapter<any>) {

  }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
    // const authData = JSON.parse(this.localStorageService.getItem('authData'));
    // if (authData) {
    //   this.AppConfig.operatorName = authData.operatorName;
    // }
  }

  logout(): void {
    // this.localStorageService.removeItem('authData');
    // this.localStorageService.removeItem('clientData');
    // this.operatorService.clearCache();
    this.router.navigateByUrl('/login');
  }

}
