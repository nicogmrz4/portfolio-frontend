import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response';
import { environment as env } from 'src/environments/environment';
import { skill } from '../interfaces/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private ENDPOINT = '/skills';

  constructor(private http: HttpClient) { }

  getSkills(): Observable<response<skill>> {
    return this.http.get<response<skill>>(env.apiUrl + this.ENDPOINT);
  }

  toNumber(num: Number): String {
    return String(num);
  }
}
