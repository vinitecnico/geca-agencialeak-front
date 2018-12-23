import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

// Classes
import { Dashboard } from '../../classes/dashboard.class';

// Services
import { DashboardService } from '../../services/dashboard.services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    dashboard: Dashboard;
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.dashboardService.get()
            .subscribe((response) => {
                this.dashboard = _.last(response);

            }, (erro) => {
                console.log(erro);
            });
    }

}
