import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education.service';
import { education } from '../interfaces/education';
import { response } from '../interfaces/response';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educations: education[] = [];
  isAutenticated: boolean = false;
  constructor(public service: EducationService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.loadEducation();
    this.isAutenticated = this.authServ.isAutenticated();
  }

  loadEducation(): void {
    this.service.getEducations().subscribe((res: response<education>) => {
      this.educations = res.data;
    })
  }

}
