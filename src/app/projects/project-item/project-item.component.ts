import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { project } from 'src/app/interfaces/project';
import { projectModel } from 'src/app/models/projectModel';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
})
export class ProjectItemComponent implements OnInit {
  @Input() data: project = Object.assign({}, projectModel); 
  @Input() isAutenticated: boolean = false;
  @Output() onDelete: EventEmitter<project> = new EventEmitter<project>();
  @Output() onEdit: EventEmitter<project> = new EventEmitter<project>();
  faPen = faPen;
  faTrash = faTrash;
  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.data)
  }
  
  edit() {
    this.onEdit.emit(this.data)
  }

}
