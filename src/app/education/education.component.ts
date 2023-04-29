import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education.service';
import { education } from '../interfaces/education';
import { response } from '../interfaces/response';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educations: education[] = [];
  constructor(public service: EducationService) { }

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.service.getEducations().subscribe((res: response<education>) => {
      this.educations = res.data;
    })
  }

}
