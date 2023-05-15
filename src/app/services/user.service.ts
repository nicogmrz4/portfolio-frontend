import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { response } from '../interfaces/response';
import { user } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private ENDPOINT = '/user';

    constructor(private http: HttpClient) {}

    getUser(): Observable<response<user>> {
      return this.http.get<response<user>>(env.apiUrl + this.ENDPOINT);
  }
    uploadProfile(profile: File): Observable<any> {
        const url = env.apiUrl + this.ENDPOINT + `/profile`;

        let formData: FormData = new FormData();
        formData.append('profile', profile);

        return this.http.post<HttpResponse<response<user>>>(url, formData, {
            observe: 'response',
        });
    }

    uploadBackground(background: File): Observable<any> {
        const url = env.apiUrl + this.ENDPOINT + `/background`;

        let formData: FormData = new FormData();
        formData.append('background', background);

        return this.http.post<HttpResponse<response<user>>>(url, formData, {
            observe: 'response',
        });
    }
}
