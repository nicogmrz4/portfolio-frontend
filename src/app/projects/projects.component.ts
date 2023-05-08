import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { project } from '../interfaces/project';
import { response } from '../interfaces/response';
import { AuthService } from '../services/auth.service';
import { projectModel } from '../models/projectModel';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projects: project[] = [];
  isAutenticated: boolean = false;
  hiddenProjectModal: Boolean = true;
  hiddenDeleteProjectConfirm: Boolean = true;
  targetProject: project = Object.assign({}, projectModel);
  targetProjectIndex!: number;

  constructor(public service: ProjectService, private AuthServ: AuthService) {}

  ngOnInit(): void {
    this.loadProject();
    this.isAutenticated = this.AuthServ.isAutenticated();
  }

  loadProject(): void {
    this.service.getProjects().subscribe((res: response<project>) => {
      this.projects = res.data;
    });
  }

  openProjectModal() {
    this.hiddenProjectModal = false;
  }

  closeProjectModal() {
    this.hiddenProjectModal = true;
  }

  newProject() {
    this.targetProject = Object.assign({}, projectModel);
    this.openProjectModal();
  }

  addProject(newItem: project) {
    this.projects.unshift(newItem);
    this.closeProjectModal();
  }

  onEditProject(item: project, itemIndex: number) {
    this.targetProject = Object.assign({}, item);
    this.targetProjectIndex = itemIndex;
    this.openProjectModal();
  }

  editProject(item: project) {
    this.projects[this.targetProjectIndex] = item;
    this.closeProjectModal();
  }

  onTryDeleteProject(item: project, itemIndex: number) {
    this.targetProject = Object.assign({}, item);
    this.targetProjectIndex = itemIndex;
    this.hiddenDeleteProjectConfirm = false;
  }

  deleteProject() {
    const id = this.targetProject.id;
    this.service.deleteProject(id).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.removeTargetFromList()
      }
    });
  }

  removeTargetFromList() {
    this.projects.splice(this.targetProjectIndex, 1);
  }
}
