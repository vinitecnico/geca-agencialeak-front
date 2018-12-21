import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as _ from 'lodash';
import { Fair } from '../../classes/fair.class';

// Services
import { PeopleService } from '../../services/people.service';

declare var swal: any;

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html'
})

export class PeopleListComponent implements OnInit, AfterViewInit {
    // Table elements
    displayedColumns = ['name', 'cpf', 'city', 'edit', 'delete'];
    dataSource = new MatTableDataSource<any>();
    pageSize = 10;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    titleMsg: String = 'Não foram encontrados resultados!';
    showMessage: boolean;
    hasSearch: boolean;

    constructor(private router: Router, private peopleService: PeopleService) {
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
        this.peopleService.getAll()
            .subscribe((data: any) => {
                if (!data || !_.isArray(data)) {
                    this.showMessage = true;
                    this.hasSearch = false;
                    return;
                } else {
                    this.hasSearch = true;
                    this.showMessage = false;

                    this.dataSource.data = _.map(data, (x) => {
                        return {
                            name: x.dados_pessoais.name,
                            cpf: x.dados_pessoais.cpf,
                            city: x.endereco_contato.city
                        };
                    });
                }
            }, (erro) => {
                this.showMessage = true;
                this.hasSearch = false;
            });
    }

    delete(_id: string) {
        swal({
            text: 'Deseja realmente apagar pessoa?',
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
                    this.peopleService.delete(_id)
                        .subscribe((data: any) => {
                            if (data === 'Feira deletada com sucesso.') {
                                swal({
                                    text: `Pessoa deletada com sucesso!`,
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
