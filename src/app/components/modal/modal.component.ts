import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() @Output() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  displayNone: Boolean = true;
  faXmark = faXmark;
  @Input() title: String = 'Modal Title';
  @Input() maxWidth: String = '300px';

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges ): void {
    console.log(changes);
    if (changes['hidden'].currentValue == false) {
      this.displayNone = false;
    }
  }

  closeModal(e: any): void {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

  handleAnimationEnd(e:any) {
    // On close
    if (e.target.classList.contains('layer')) {
      this.displayNone = true;
      console.log(this.hidden, this.displayNone);
    }

  }
}
