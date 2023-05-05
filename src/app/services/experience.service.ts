import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

    createExperices(item: experience): Observable<any> {
        return this.http.post<HttpResponse<response<experience>>>(env.apiUrl + this.ENDPOINT, item, {
            observe: 'response'
        });
    }

    editExperices(id: any, editedItem: experience): Observable<any> {
        return this.http.put<HttpResponse<response<experience>>>(env.apiUrl + this.ENDPOINT + `/${id}`, editedItem, {
            observe: 'response'
        });
    }

    deleteExperices(id: any): Observable<any> {
        return this.http.delete<HttpResponse<response<any>>>(env.apiUrl + this.ENDPOINT + `/${id}` , {
            observe: 'response'
        });
    }
}
