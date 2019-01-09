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
    genderChartData;
    etniaChartData;
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

                    if ((this.dashboard.charts && this.dashboard.charts.gender) &&
                        (this.dashboard.charts.gender.male ||
                            this.dashboard.charts.gender.female)) {
                        this.genderChartData = {
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

                        if (this.dashboard.charts && this.dashboard.charts.etnia) {
                            this.etniaChartData = {
                                chartType: 'PieChart',
                                dataTable: [
                                    ['Tipo', 'Total']
                                ],
                                options: {
                                    legend: { position: 'right' },
                                    width: '80%',
                                    slices: {
                                        is3D: true,
                                        0: {
                                            offset: 0.3
                                        },
                                        1: {
                                            offset: 0.2
                                        }
                                    }
                                }
                            };

                            _.each(this.dashboard.charts.etnia, (value, key) => {
                                this.etniaChartData.dataTable.push([_.capitalize(key), value]);
                            });
                        }
                    }

                }, 600);
            }, (erro) => {
                console.log(erro);
            });
    }

}
