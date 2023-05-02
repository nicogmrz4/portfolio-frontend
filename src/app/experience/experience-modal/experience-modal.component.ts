import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnInit {
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onOpen(): void {
    this.hiddenChange.emit(this.hidden);
  }

  onClose(): void {
    this.hiddenChange.emit(this.hidden);
  }
}
