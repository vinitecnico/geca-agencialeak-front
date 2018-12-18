import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  activeUrl: string;
  urlItem: string;
  urlSubItem: string;
  constructor(private router: Router) {
    router.events.subscribe((val: NavigationEnd) => {
      this.activeUrl = val.url;
      this.changeRouter();
    });
  }

  ngOnInit() {

  }

  changeRouter() {
    setTimeout(() => {
      if (this.activeUrl === '/app/information') {
        return;
      }

      const urlItems = _.remove(_.split(this.activeUrl, '/'), (x) => {
        return x;
      });
      if (urlItems) {
        this.urlItem = _.first(urlItems);
        document.getElementById(this.urlItem).className = 'menu-item-has-children dropdown show';

        if (urlItems.length > 1) {
          this.urlSubItem = _.last(urlItems);
          const htmlItem: any = document.getElementById(this.urlItem).getElementsByTagName('ul')[0];
          htmlItem.className = 'sub-menu children dropdown-menu show';
          const removeSubItem = document.getElementsByClassName('action-sub-menu');
          if (removeSubItem && removeSubItem.length > 0) {
            document.getElementsByClassName('action-sub-menu')[0].classList.remove('action-sub-menu');
          }
          document.getElementById(this.urlSubItem).className = 'action-sub-menu';
        }
      }
    }, 0);
  }
}
