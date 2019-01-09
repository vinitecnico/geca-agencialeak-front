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
    // pieChartData = {
    //     chartType: 'PieChart',
    //     dataTable: [
    //         ['Task', 'Hours per Day'],
    //         ['Work', 11],
    //         ['Eat', 2],
    //         ['Commute', 2],
    //         ['Watch TV', 2],
    //         ['Sleep', 7]
    //     ],
    //     options: { 'title': 'Tasks' },
    // };
    pieChartData;
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

                    this.pieChartData = {
                        chartType: 'ColumnChart',
                        dataTable: [
                            ['Sexo', 'Total'],
                            ['Masculino', this.dashboard.charts &&
                                this.dashboard.charts.gender &&
                                this.dashboard.charts.gender.male ?
                                this.dashboard.charts.gender.male : 0],
                            ['Feminino', this.dashboard.charts &&
                                this.dashboard.charts.gender &&
                                this.dashboard.charts.gender.female ?
                                this.dashboard.charts.gender.female : 0]
                        ],
                        options: {
                            legend: { position: 'none' },
                            width: '80%'
                        }
                    };

                }, 600);
            }, (erro) => {
                console.log(erro);
            });
    }

}
