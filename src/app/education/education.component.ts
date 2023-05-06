import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education.service';
import { education } from '../interfaces/education';
import { response } from '../interfaces/response';
import { AuthService } from '../services/auth.service';
import { educationModel } from '../models/educationModel';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educations: education[] = [];
  isAutenticated: boolean = false;
  hiddenEducationModal: Boolean = true;
  hiddenDeleteEducationConfirm: Boolean = true;
  targetEducationIndex!: number;
  targetEducation: education = Object.assign({}, educationModel);

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

  openEducationModal() {
    this.hiddenEducationModal = false;
  }

  closeEducationModal() {
    this.hiddenEducationModal = true;
  }

  newEducation() {
    this.targetEducation = Object.assign({}, educationModel);
    this.openEducationModal();
  }

  addEducation(newItem: education) {
    this.educations.unshift(newItem);
    this.closeEducationModal();
  }

  onEditEducation(item: education, itemIndex: number) {
    this.targetEducation = Object.assign({}, item);
    this.targetEducationIndex = itemIndex;
    this.openEducationModal();
  }

  editEducation(item: education) {
    this.educations[this.targetEducationIndex] = item;
    this.closeEducationModal();
  }

  onTryDeleteEducation(item: education, itemIndex: number) {
    this.targetEducation = Object.assign({}, item);
    this.targetEducationIndex = itemIndex;
    this.hiddenDeleteEducationConfirm = false;
  }

  deleteEducation() {
    const id = this.targetEducation.id;
    this.service.deleteEducation(id).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.removeTargetFromList()
      }
    });
  }

  removeTargetFromList() {
    this.educations.splice(this.targetEducationIndex, 1);
  }
}
