import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  activeUrl: string;
  urlItem: string;
  urlItems: any;
  urlSubItem: string;
  isMenuToggle: Boolean = true;
  constructor(private router: Router) {
    router.events.subscribe((val: NavigationEnd) => {
      this.activeUrl = val.url;
      this.changeRouter();
    });
  }

  ngOnInit() {

  }

  logout() {
    localStorage.setItem('authData', null);
    this.router.navigateByUrl('/login');
  }

  changeRouter() {
    if (this.activeUrl === '/' || this.activeUrl === '/app/dashboard') {
      return;
    }

    this.urlItems = _.remove(_.split(this.activeUrl, '/'), (x) => {
      return x;
    });

    this.setMenu();
  }

  setMenu() {
    if (this.urlItems && this.urlItems.length >= 2) {
      setTimeout(() => {
        $('.action-sub-menu').removeClass('action-sub-menu');
        this.urlItem = _.first(this.urlItems);
        const hasShow = $(`#${this.urlItem}`).children('show');
        if (hasShow.length === 0) {
          if (this.isMenuToggle) {
            $(`#${this.urlItem}`).addClass('show');
            $(`#${this.urlItem}`).children('.sub-menu').addClass('show');
          } else {
            setTimeout(() => {
              if (document.getElementsByClassName('menu-item-has-children').length > 0) {
                for (let i = 0; i < document.getElementsByClassName('menu-item-has-children').length; i++) {
                  document.getElementsByClassName('menu-item-has-children')[i].classList.remove('show');
                }
                for (let i = 0; i < document.getElementsByClassName('sub-menu').length; i++) {
                  document.getElementsByClassName('sub-menu')[i].classList.remove('show');
                }
              }
            }, 100);
          }

          this.urlSubItem = _.last(this.urlItems);
          if (this.urlSubItem.indexOf('-') >= 0) {
            this.urlSubItem = _.first(_.split(this.urlSubItem, '-'));
          }
          $(`#${this.urlSubItem}`).addClass('action-sub-menu');
        }
      });
    }
  }

  menuToggle() {
    const windowWidth = $(window).width();
    if (windowWidth < 1010) {
      $('body').removeClass('open');
      if (windowWidth < 760) {
        $('#left-panel').slideToggle();
      } else {
        $('#left-panel').toggleClass('open-menu');
      }
    } else {
      $('body').toggleClass('open');
      $('#left-panel').removeClass('open-menu');

      this.isMenuToggle = !this.isMenuToggle;
      $('.menu-item-has-children.dropdown')
        .each(function () {
          $(this).removeClass('show');
          $(this).children('.sub-menu').removeClass('show');
        });
      this.setMenu();
    }
  }
}
