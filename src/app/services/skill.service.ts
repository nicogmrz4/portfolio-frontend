import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response';
import { environment as env } from 'src/environments/environment';
import { skill } from '../interfaces/skill';

@Injectable({
    providedIn: 'root',
})
export class SkillService {
    private ENDPOINT = '/skills';

    constructor(private http: HttpClient) {}

    getSkills(): Observable<response<skill>> {
        return this.http.get<response<skill>>(env.apiUrl + this.ENDPOINT);
    }

    createSkill(item: skill): Observable<any> {
        return this.http.post<HttpResponse<response<skill>>>(
            env.apiUrl + this.ENDPOINT,
            item,
            {
                observe: 'response',
            }
        );
    }

    editSkill(id: any, editedItem: skill): Observable<any> {
        return this.http.put<HttpResponse<response<skill>>>(
            env.apiUrl + this.ENDPOINT + `/${id}`,
            editedItem,
            {
                observe: 'response',
            }
        );
    }

    deleteSkill(id: any): Observable<any> {
        return this.http.delete<HttpResponse<response<any>>>(
            env.apiUrl + this.ENDPOINT + `/${id}`,
            {
                observe: 'response',
            }
        );
    }

    toNumber(num: Number): String {
        return String(num);
    }
}
