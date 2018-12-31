import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import * as _ from 'lodash';
import { Fair } from '../../classes/fair.class';

// Services
import { FairService } from '../../services/fair.service';
import { Subject } from 'rxjs';

declare var swal: any;

@Component({
    selector: 'app-fair-list',
    templateUrl: './fair-list.component.html'
})

export class FairListComponent implements OnInit {
    // Table elements
    displayedColumns = ['name', 'weekday', 'city', 'edit', 'delete'];
    dataSource = new MatTableDataSource<any>();
    pageIndex = 0;
    length = 0;
    pageSize = 5;
    pageSizeOptions = [5, 10, 15, 25];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    sort = { active: 'name', direction: 'asc' };
    titleMsg: String = 'Não foram encontrados resultados!';
    showMessage: boolean;
    hasSearch: boolean;
    filterValue: string;
    searchTextChanged = new Subject<string>();
    noItems: boolean;

    constructor(private router: Router, private fairService: FairService) {
    }

    applyFilter(filterValue: string): void {
        setTimeout(() => {
            this.filterValue = filterValue.trim().toLowerCase();
            this.pageIndex = 0;
            this.getAll(this.pageIndex, this.pageSize);
        }, 600);
    }

    sortData(sort: Sort) {
        if (sort.active && !sort.direction) {
            sort.direction = 'asc';
        }
        this.sort = sort;
        this.pageIndex = 0;
        this.getAll(this.pageIndex, this.pageSize);
    }

    ngOnInit() {
        this.getAll(this.pageIndex, this.pageSize);
    }

    getNext(event: PageEvent) {
        this.getAll(event.pageIndex, event.pageSize);
    }

    getAll(page, pageSize): void {
        let request: any = {
            page: page + 1,
            per_page: pageSize,
            active: this.sort.active,
            direction: this.sort.direction === 'asc' ? 1 : -1
        };
        if (this.filterValue) {
            request.value = this.filterValue
        }
        this.fairService.getAll(request)
            .subscribe((response: any) => {
                this.length = response.total;
                this.dataSource.data = response.data;

                if (this.length === 0) {
                    this.showMessage = true;
                    this.hasSearch = false;
                    if (this.filterValue) {
                        this.noItems = true;
                    }
                } else {
                    this.hasSearch = true;
                    this.noItems = true;
                    this.showMessage = false;
                }
            }, (erro) => {
                this.showMessage = true;
                this.hasSearch = false;
            });
    }

    delete(_id: string) {
        swal({
            text: 'Deseja realmente apagar a feira?',
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
                    this.fairService.delete(_id)
                        .subscribe((data: any) => {
                            if (data === 'Feira deletada com sucesso.') {
                                swal({
                                    text: `Feira deletada com sucesso!`,
                                    type: 'success'
                                }).then(() => {
                                    this.getAll(this.pageIndex, this.pageSize);
                                });
                            }
                        }, () => {
                            this.getAll(this.pageIndex, this.pageSize);
                        });
                }
            });
    }
}
