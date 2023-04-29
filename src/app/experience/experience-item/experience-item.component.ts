import { Component, Input, OnInit } from '@angular/core';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
})
export class ExperienceItemComponent implements OnInit {
  faBriefcase = faBriefcase;
  @Input() company: String = "";
  @Input() logo: String = "";
  @Input() job: String = "";
  @Input() description: String = "";
  @Input() periodFrom: String = "";
  @Input() periodTo: String = "";

  ngOnInit(): void {
    
  }
}
