import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  form: FormGroup;
  passwordType: String = 'password';
  showPasswordError = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: [null, Validators.required],
      username: [null, Validators.required],
      host: [null, Validators.required],
      managerId: null
    });
  }

  login() {
    if (!this.form.valid) {
      // this.formService.validateAllFormFields(this.form);
      return;
    }

    const data = this.form.value;
    alert(true);
  }

  getHostErrorMessage(): string {
    return '';
  }
}
