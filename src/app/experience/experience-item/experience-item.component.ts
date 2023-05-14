import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faBriefcase, faEllipsisVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { experience } from 'src/app/interfaces/experience';
import * as moment from 'moment';
import { environment as env } from 'src/environments/environment';


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
  mediaUrl: string = env.mediaUrl;

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
    this.onDelete.emit(this.data);
  }

  edit() {
    this.onEdit.emit(this.data);
  }
}
