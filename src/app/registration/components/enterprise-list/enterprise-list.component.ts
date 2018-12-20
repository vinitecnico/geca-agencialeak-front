import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { College } from '../../classes/college.class';
import * as _ from 'lodash';
declare var swal: any;

// services
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
    selector: 'app-enterprise-list',
    templateUrl: './enterprise-list.component.html'
})

export class EnterpriseListComponent implements OnInit, AfterViewInit {
    // Table elements
    displayedColumns = ['name', 'cnpj', 'city', 'mainContact', 'phone', 'mobile', 'edit', 'delete'];
    dataSource = new MatTableDataSource<College>();
    pageSize = 10;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    titleMsg: String = 'Não foram encontrados resultados!';
    showMessage: boolean;
    hasSearch: boolean;

    constructor(private router: Router, private enterpriseService: EnterpriseService) {
    }

    applyFilter(filterValue: string, data: any): void {
        filterValue = filterValue.trim().toLowerCase();
        data.filter = filterValue;
    }

    ngOnInit() {
        this.getAll();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getAll(): void {
        this.enterpriseService.getAll()
            .subscribe((data: any) => {
                this.dataSource.data = data;

                if (!data || !_.isArray(data)) {
                    this.showMessage = true;
                    this.hasSearch = false;
                    return;
                } else {
                    this.hasSearch = true;
                    this.showMessage = false;
                }
            }, () => {
                this.showMessage = true;
                this.hasSearch = false;
            });
    }

    delete(_id: string) {
        swal({
            text: 'Deseja realmente apagar o Colégio?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Apagar',
            cancelButtonText: 'Cancelar',
            closeOnConfirm: false,
            closeOnCancel: false
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    this.enterpriseService.delete(_id)
                        .subscribe((data: any) => {
                            if (data) {
                                swal({
                                    text: `Colégio deletada com sucesso!`,
                                    type: 'success'
                                }).then(() => {
                                    this.getAll();
                                });
                            }
                        }, () => {
                            this.getAll();
                        });
                }
            });
    }
}
