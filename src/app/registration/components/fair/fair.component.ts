import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-fair',
    templateUrl: './fair.component.html'
})

export class FairComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            weekday: [null, Validators.required],
            cep: [null, Validators.required],
            address: [null],
            numberAddress: [null],
            complement: [null],
            neighborhood: [null],
            city: [null],
            uf: [null],
            gps: [null]
        });
    }
}
