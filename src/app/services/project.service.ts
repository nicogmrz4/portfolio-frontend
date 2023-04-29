import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response';
import { project } from '../interfaces/project';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private ENDPOINT = "/projects";

  constructor(public http: HttpClient) { }

  getProjects(): Observable<response<project>> {
    return this.http.get<response<project>>(env.apiUrl + this.ENDPOINT);
  }
}
