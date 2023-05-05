import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnChanges {
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  @Input() title: String = 'Title';
  @Input() message: String = '';
  @Output() onAcept = new EventEmitter<Boolean>();
  @Output() onCancel = new EventEmitter<Boolean>();
  displayNone: Boolean = true;
  faXmark = faXmark;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    // On open
    if (this.hidden == false) {
      this.displayNone = false;
    }
  }

  closeConfirm(): void {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

  handleAnimationEnd(e:any) {
    // On close
    if (e.target.classList.contains('layer')) {
      this.displayNone = true;
    }
  }

  acept() {
    this.onAcept.emit();
    this.closeConfirm();
  }
  
  cancel() {
    this.onCancel.emit();
    this.closeConfirm();
  }
}
