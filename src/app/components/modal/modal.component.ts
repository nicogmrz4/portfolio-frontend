import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  @Output() open = new EventEmitter<Boolean>();
  @Output() close = new EventEmitter<Boolean>();
  displayNone: Boolean = true;
  faXmark = faXmark;
  @Input() title: string = 'Modal Title';
  @Input() maxWidth: string = '300px';

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges ): void {
    if (this.hidden == false) {
      this.open.emit();
      this.displayNone = false;
    }

    if (this.hidden == true) {
      this.close.emit();
    }
  }

  closeModal(e: any): void {
    this.hiddenChange.emit(true);
  }

  handleAnimationEnd(e:any) {
    // On close
    if (e.target.classList.contains('layer')) {
      this.displayNone = true;
    }

  }
}
