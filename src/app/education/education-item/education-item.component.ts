import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faGraduationCap, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { education } from 'src/app/interfaces/education';
import { educationModel } from 'src/app/models/educationModel';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {
  @Input() data: education = Object.assign({}, educationModel);
  @Output() onDelete: EventEmitter<education> = new EventEmitter<education>();
  @Output() onEdit: EventEmitter<education> = new EventEmitter<education>();
  @Input() isAutenticated: boolean = false;
  faPen = faPen;
  faTrash = faTrash;
  faGraduationCap = faGraduationCap;

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
