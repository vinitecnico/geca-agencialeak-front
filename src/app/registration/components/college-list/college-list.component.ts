import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { College } from '../../classes/college.class';
declare var swal: any;

// services
import { CollegeService } from '../../services/college.service';

@Component({
    selector: 'app-college-list',
    templateUrl: './college-list.component.html'
})

export class CollegeListComponent implements OnInit, AfterViewInit {
    // Table elements
    displayedColumns = ['name', 'electoralzone', 'section', 'neighborhood', 'city', 'edit', 'delete'];
    dataSource = new MatTableDataSource<College>();
    pageSize = 10;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    titleMsg: String = 'Não foram encontrados resultados!';
    showMessage: boolean;
    hasSearch: boolean;

    constructor(private router: Router, private collegeService: CollegeService) {
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
        this.collegeService.getAll()
            .subscribe((data: any) => {
                this.dataSource.data = data;

                if (!data || data.length === 0) {
                    this.showMessage = true;
                    this.hasSearch = false;
                    return;
                } else {
                    this.hasSearch = true;
                    this.showMessage = false;
                }
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
                    this.collegeService.delete(_id)
                        .subscribe((data: any) => {
                            if (data) {
                                swal({
                                    text: `Colégio deletada com sucesso!`,
                                    type: 'success'
                                }).then(() => {
                                    this.getAll();
                                });
                            }
                        });
                }
            });
    }
}
