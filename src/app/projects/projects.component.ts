import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { project } from '../interfaces/project';
import { response } from '../interfaces/response';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projects: project[] = [];
  isAutenticated: boolean = false;

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
}
