import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { response } from '../interfaces/response';
import { experience } from '../interfaces/experience';

@Injectable({
    providedIn: 'root',
})
export class ExperienceService {
    private ENDPOINT = '/experiences';

    constructor(private http: HttpClient) {}

    getExperices(): Observable<response<experience>> {
        return this.http.get<response<experience>>(env.apiUrl + this.ENDPOINT);
    }
}
