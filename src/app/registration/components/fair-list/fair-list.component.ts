import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Fair } from '../../classes/fair.class';

// Services
import { FairService } from '../../services/fair.service';

declare var swal: any;

@Component({
    selector: 'app-fair-list',
    templateUrl: './fair-list.component.html'
})

export class FairListComponent implements OnInit, AfterViewInit {
    // Table elements
    displayedColumns = ['name', 'weekday', 'city', 'edit'];
    dataSource = new MatTableDataSource<Fair>();
    pageSize = 10;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    titleMsg: String = 'Não foram encontrados resultados!';
    showMessage: boolean;
    hasSearch: boolean;

    constructor(private router: Router, private fairService: FairService) {
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
        this.fairService.getAll()
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
}
