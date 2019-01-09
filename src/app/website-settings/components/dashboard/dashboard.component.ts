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
                this.dashboard = {
                    totalItems: {
                        pessoa: 0,
                        feiras: 0,
                        empresas: 0,
                        colegios: 0
                    },
                    charts: {}
                };
                setTimeout(() => {
                    this.dashboard = _.last(response);
                }, 600);
            }, (erro) => {
                console.log(erro);
            });
    }

}
