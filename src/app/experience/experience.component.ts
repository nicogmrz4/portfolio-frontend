import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { experience } from '../interfaces/experience';
import { response } from '../interfaces/response';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experiences: experience[] = [];
  isAutenticated: boolean = false;

  constructor(public service: ExperienceService, public authServ: AuthService) { }

  ngOnInit(): void {
    this.loadExperiences();
    if (this.authServ.isAutenticated()) {
      this.isAutenticated = true;
    }
  }

  loadExperiences(): void {
    this.service.getExperices().subscribe((res: response<experience>) => {
      this.experiences = res.data;
    })
  }
}
