import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
})
export class ProjectItemComponent implements OnInit {
  @Input() name: String = ''; 
  @Input() image: String = ''; 
  @Input() description: String = ''; 
  @Input() date: String = ''; 
  @Input() url: String = ''; 
  @Input() repository: String = ''; 
  constructor() { }

  ngOnInit(): void {
  }

}
