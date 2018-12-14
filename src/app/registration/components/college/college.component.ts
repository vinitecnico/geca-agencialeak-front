import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-college',
    templateUrl: './college.component.html'
})

export class CollegeComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            numeroEleitores: [null, Validators.required],
            zona: [null, Validators.required],
            secoes: [null, Validators.required],
            secoesEspeciais: [null, Validators.required],
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
