import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { project } from 'src/app/interfaces/project';
import { response } from 'src/app/interfaces/response';
import { projectModel } from 'src/app/models/projectModel';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  @Output() onNewProject = new EventEmitter<project>();
  @Output() onEditProject = new EventEmitter<project>();
  @Input() currentData: project = Object.assign({}, projectModel);
  title = '';

  constructor(private service: ProjectService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['currentData'].currentValue.id != null) {
          console.log("Editar")
          this.title = 'Editar educación';
      } else {
          console.log("Añadir")
          this.title = 'Añadir educación';
      }
  }

  onOpen(): void {
      this.hiddenChange.emit(false);
  }

  onClose(): void {
      this.hiddenChange.emit(true);
  }

  onSubmit() {
      // if id isn't null a item is edited, then make a PUT request
      if (this.currentData.id != null) this.editProject(this.currentData.id, this.currentData);
      else this.newProject();
  }

  newProject() {
      this.service
          .createProject(this.currentData)
          .subscribe((res: HttpResponse<response<project>>) => {
              if (res.status == 201) {
                  const newProject = res.body?.data[0];
                  this.onNewProject.emit(newProject);
              }
          });
  }

  editProject(id: any, data: project) {
      this.service
          .editProject(id, data)
          .subscribe((res: HttpResponse<response<project>>) => {
            if (res.status == 200) {
              const editedProject = res.body?.data[0];
              this.onEditProject.emit(editedProject);
            }
          });
  }
}
