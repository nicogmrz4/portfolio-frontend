import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { project } from 'src/app/interfaces/project';
import { projectModel } from 'src/app/models/projectModel';
import * as moment from 'moment';
import { environment as env } from 'src/environments/environment';

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
    mediaUrl = env.mediaUrl;

    constructor() {}

    ngOnInit(): void {
      const dateCorrectFormat = /\d{1,2}\/\d{1,2}\/\d{4}/;

      if (!!this.data.createdAt && !dateCorrectFormat.test(this.data.createdAt)) {
        let createdAtFormatted = moment(this.data.createdAt, "yyyy/mm/dd").format("D/m/YYYY");
        this.data.createdAt = createdAtFormatted;
      }
    }

    delete() {
        this.onDelete.emit(this.data);
    }

    edit() {
        this.onEdit.emit(this.data);
    }
}
