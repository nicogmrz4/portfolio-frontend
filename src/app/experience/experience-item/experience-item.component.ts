import { Component, Input, OnInit } from '@angular/core';
import { faBriefcase, faEllipsisVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
})
export class ExperienceItemComponent implements OnInit {
  faBriefcase = faBriefcase;
  faPen = faPen;
  faTrash = faTrash;
  faEllipsisVertical = faEllipsisVertical;
  @Input() company: String = "";
  @Input() logo: String = "";
  @Input() job: String = "";
  @Input() description: String = "";
  @Input() periodFrom: String = "";
  @Input() periodTo: String = "";
  @Input() isAutenticated: Boolean = false;

  ngOnInit(): void {
    
  }
}
