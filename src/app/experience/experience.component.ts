import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { experience } from '../interfaces/experience';
import { response } from '../interfaces/response';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { experienceModel } from '../models/experienceModel';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experiences: experience[] = [];
  isAutenticated: Boolean = false;
  hiddenExperienceModal: Boolean = true;
  hiddenDeleteExperienceConfirm: Boolean = true;
  targetExperienceIndex!: number;
  targetExperience: experience = Object.assign({}, experienceModel); // it can be a new or existent item

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

  openExperienceModal() {
    this.hiddenExperienceModal = false;
  }

  closeExperienceModal() {
    this.hiddenExperienceModal = true;
  }

  newExperience() {
    this.targetExperience = Object.assign({}, experienceModel);
    this.openExperienceModal();
  }

  addExperience(newItem: experience) {
    this.experiences.unshift(newItem);
    this.closeExperienceModal()
  }

  onEditExperience(item: experience, itemIndex: number) {
    this.targetExperience = Object.assign({}, item);
    this.targetExperienceIndex = itemIndex;
    this.openExperienceModal();
  }

  editExperience(item: experience) {
    this.experiences[this.targetExperienceIndex] = item;
    this.closeExperienceModal()
  }

  onTryDeleteExperience(item: experience, itemIndex: number) {
    this.targetExperience = Object.assign({}, item);
    this.targetExperienceIndex = itemIndex;
    this.hiddenDeleteExperienceConfirm = false;
  }

  deleteExperience() {
    const id = this.targetExperience.id;
    this.service.deleteExperices(id).subscribe((res: HttpResponse<response<any>>) => {
      if (res.status == 200) {
        this.removeTargetFromList();
      }
    })
  }

  removeTargetFromList() {
    this.experiences.splice(this.targetExperienceIndex, 1);
  }
}
