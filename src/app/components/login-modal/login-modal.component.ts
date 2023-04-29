import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Input() @Output() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }

}
