import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faBriefcase, faEllipsisVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { experience } from 'src/app/interfaces/experience';


@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
})
export class ExperienceItemComponent implements OnInit {
  faBriefcase = faBriefcase;
  faPen = faPen;
  faTrash = faTrash;
  faEllipsisVertical = faEllipsisVertical;
  @Input() data!: experience;
  @Input() isAutenticated: Boolean = false;
  @Output() onDelete: EventEmitter<experience> = new EventEmitter<experience>();
  @Output() onEdit: EventEmitter<experience> = new EventEmitter<experience>();

  ngOnInit(): void {
    
  }

  delete() {
    this.onDelete.emit(this.data);
  }

  edit() {
    this.onEdit.emit(this.data);
  }
}
