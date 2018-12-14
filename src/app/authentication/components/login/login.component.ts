import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  form: FormGroup;
  passwordType: String = 'password';
  showPasswordError = false;

  constructor(private router: Router, @Inject('LocalStorage') localStorage,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: [null, Validators.required],
      username: [null, Validators.required]
    });
  }

  login() {
    if (!this.form.valid) {
      // this.formService.validateAllFormFields(this.form);
      return;
    }

    localStorage.setItem('authData', JSON.stringify({expires_in: moment().add(30, 'minutes')}));
    this.router.navigateByUrl('/app/information');
  }

  getHostErrorMessage(): string {
    return '';
  }
}
