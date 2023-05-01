import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() inputValue: String = "";
  @Output() inputValueChange = new EventEmitter<String>();
  @Input() label: String = "";
  focus: Boolean = false;
  id!: String;

  constructor() { }

  ngOnInit(): void {
    this.generateId();
  }

  generateId(): void {
    this.id = this.label.split(" ").join("-").toLocaleLowerCase() + "-" + Math.round((Math.random() * 10000));
  }
}
