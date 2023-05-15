import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthCredentials } from 'src/app/interfaces/auth-credentials';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: AuthCredentials = {
    username: '',
    password: ''
  }
  hiddenCredentialsErr: Boolean = true;

  constructor(private services: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    this.services.login(this.credentials).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.router.navigate([""]);
        } 
      },
      error: (resErr: HttpErrorResponse) => {
        this.hiddenCredentialsErr = false;
      }
    })
  }

}
