import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit{
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  email: String = "";
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
