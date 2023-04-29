import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../interfaces/response';
import { education } from '../interfaces/education';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private ENDPOINT = '/academies';

  constructor(private http: HttpClient) {}

  getEducations(): Observable<response<education>> {
      return this.http.get<response<education>>(env.apiUrl + this.ENDPOINT);
  }
}
