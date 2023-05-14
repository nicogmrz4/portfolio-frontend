import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faGraduationCap, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { education } from 'src/app/interfaces/education';
import { educationModel } from 'src/app/models/educationModel';
import * as moment from 'moment';
import { environment as env} from 'src/environments/environment';

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
  mediaUrl: string = env.mediaUrl;

  constructor() { }

  ngOnInit(): void {
    const dateCorrectFormat = /\d{1,2}\/\d{4}/;

    if (!!this.data.periodFrom && !dateCorrectFormat.test(this.data.periodFrom)) {
      let periodFromFormatted = moment(this.data.periodFrom, "yyyy/mm/dd").format("m/yyyy");
      this.data.periodFrom = periodFromFormatted;
    }

    if (!!this.data.periodAt && !dateCorrectFormat.test(this.data.periodAt)) {
      let periodAtFormatted = moment(this.data.periodAt, "yyyy/mm/dd").format("m/yyyy");
      this.data.periodAt = periodAtFormatted;
    }
  }

  delete() {
    this.onDelete.emit(this.data)
  }
  
  edit() {
    this.onEdit.emit(this.data)
  }

}
