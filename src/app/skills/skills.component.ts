import { Component, OnInit } from '@angular/core';
import { SkillService } from '../services/skill.service';
import { response } from '../interfaces/response';
import { skill } from '../interfaces/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: skill[] = [];

  constructor(public service: SkillService) { }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.service.getSkills().subscribe((res: response<skill>) => {
      this.skills = res.data;
    })
  }
}
