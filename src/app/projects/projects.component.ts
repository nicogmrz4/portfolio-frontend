import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { project } from '../interfaces/project';
import { response } from '../interfaces/response';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projects: project[] = [];

  constructor(public service: ProjectService) {}
  ngOnInit(): void {
    this.loadProject();
  }

  loadProject(): void {
    this.service.getProjects().subscribe((res: response<project>) => {
      this.projects = res.data;
    });
  }
}
