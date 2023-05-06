import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response';
import { education } from '../interfaces/education';
import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class EducationService {
    private ENDPOINT = '/academies';

    constructor(private http: HttpClient) {}

    getEducations(): Observable<response<education>> {
        return this.http.get<response<education>>(env.apiUrl + this.ENDPOINT);
    }

    createEducation(item: education): Observable<any> {
        return this.http.post<HttpResponse<response<education>>>(
            env.apiUrl + this.ENDPOINT,
            item,
            {
                observe: 'response',
            }
        );
    }

    editEducation(id: any, editedItem: education): Observable<any> {
        return this.http.put<HttpResponse<response<education>>>(
            env.apiUrl + this.ENDPOINT + `/${id}`,
            editedItem,
            {
                observe: 'response',
            }
        );
    }

    deleteEducation(id: any): Observable<any> {
        return this.http.delete<HttpResponse<response<any>>>(
            env.apiUrl + this.ENDPOINT + `/${id}`,
            {
                observe: 'response',
            }
        );
    }
}
