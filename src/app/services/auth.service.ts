import { Injectable } from '@angular/core';
import { AuthCredentials } from '../interfaces/auth-credentials';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT = '/login';

  constructor(public http: HttpClient, private router: Router) { }

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post<any>(env.apiUrl + this.ENDPOINT, credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      if (response.status === 200) {
        const bearerToken = response.headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');

        localStorage.setItem('token', token);
      }
      return response;
    }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAutenticated() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    if (this.isAutenticated()) {
      localStorage.removeItem('token');
      location.reload()
    }
  }
}
