import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { experience } from '../interfaces/experience';
import { response } from '../interfaces/response';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experiences: experience[] = [];

  constructor(public service: ExperienceService) { }

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.service.getExperices().subscribe((res: response<experience>) => {
      this.experiences = res.data;
    })
  }
}
