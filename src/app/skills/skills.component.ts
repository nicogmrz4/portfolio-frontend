import { Component, OnInit } from '@angular/core';
import { SkillService } from '../services/skill.service';
import { response } from '../interfaces/response';
import { skill } from '../interfaces/skill';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { skillModel } from '../models/skillModel';
import { HttpResponse } from '@angular/common/http';

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
  hiddenSkillModal: Boolean = true;
  hiddenDeleteSkillConfirm: Boolean = true;
  targetSkill: skill = Object.assign({}, skillModel);
  targetSkillIndex!: number;

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

  
  openSkillModal() {
    this.hiddenSkillModal = false;
  }

  closeSkillModal() {
    this.hiddenSkillModal = true;
  }

  newSkill() {
    this.targetSkill = Object.assign({}, skillModel);
    this.openSkillModal();
  }

  addSkill(newItem: skill) {
    this.skills.unshift(newItem);
    this.closeSkillModal();
  }

  onEditSkill(item: skill, itemIndex: number) {
    this.targetSkill = Object.assign({}, item);
    this.targetSkillIndex = itemIndex;
    this.openSkillModal();
  }

  editSkill(item: skill) {
    this.skills[this.targetSkillIndex] = item;
    this.closeSkillModal();
  }

  onTryDeleteSkill(item: skill, itemIndex: number) {
    this.targetSkill = Object.assign({}, item);
    this.targetSkillIndex = itemIndex;
    this.hiddenDeleteSkillConfirm = false;
  }

  deleteSkill() {
    const id = this.targetSkill.id;
    this.service.deleteSkill(id).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.removeTargetFromList()
      }
    });
  }

  removeTargetFromList() {
    this.skills.splice(this.targetSkillIndex, 1);
  }
}
