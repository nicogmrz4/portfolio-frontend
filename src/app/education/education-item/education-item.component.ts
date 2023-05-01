import { Component, OnInit, Input } from '@angular/core';
import { faGraduationCap, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {
  @Input() institute: String = "";
  @Input() logo: String = "";
  @Input() description: String = "";
  @Input() periodFrom: String = "";
  @Input() periodTo: String = "";
  @Input() isAutenticated: boolean = false;
  faPen = faPen;
  faTrash = faTrash;
  faGraduationCap = faGraduationCap;

  constructor() { }

  ngOnInit(): void {
  }

}
