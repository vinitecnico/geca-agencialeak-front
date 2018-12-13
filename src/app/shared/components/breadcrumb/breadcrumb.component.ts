import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnInit {
    @Input() title: string;
    @Input() domain: string;
    @Input() page: string;

    constructor() {
    }

    ngOnInit() {
    }

}
