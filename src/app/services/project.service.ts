import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response';
import { project } from '../interfaces/project';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private ENDPOINT = '/projects';

    constructor(public http: HttpClient) {}

    getProjects(): Observable<response<project>> {
        return this.http.get<response<project>>(env.apiUrl + this.ENDPOINT);
    }

    createProject(item: project): Observable<any> {
        return this.http.post<HttpResponse<response<project>>>(
            env.apiUrl + this.ENDPOINT,
            item,
            {
                observe: 'response',
            }
        );
    }

    editProject(id: any, editedItem: project): Observable<any> {
        return this.http.put<HttpResponse<response<project>>>(
            env.apiUrl + this.ENDPOINT + `/${id}`,
            editedItem,
            {
                observe: 'response',
            }
        );
    }

    deleteProject(id: any): Observable<any> {
        return this.http.delete<HttpResponse<response<any>>>(
            env.apiUrl + this.ENDPOINT + `/${id}`,
            {
                observe: 'response',
            }
        );
    }

    uploadProjectImage(id: any, image: File): Observable<any> {
        const url = env.apiUrl + this.ENDPOINT + `/${id}/image`;
        
        let formData: FormData = new FormData();
        formData.append('image', image);

        return this.http.post<HttpResponse<response<project>>>(url, formData, {
            observe: 'response'
        });
    }
}
