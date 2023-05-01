import { Component, OnInit } from '@angular/core';
import { SkillService } from '../services/skill.service';
import { response } from '../interfaces/response';
import { skill } from '../interfaces/skill';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: skill[] = [];
  faPen = faPen;
  faTrash = faTrash
  isAutenticated: Boolean = false;

  constructor(public service: SkillService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.loadSkills();
    this.isAutenticated = this.authServ.isAutenticated();
  }

  loadSkills(): void {
    this.service.getSkills().subscribe((res: response<skill>) => {
      this.skills = res.data;
    })
  }
}
