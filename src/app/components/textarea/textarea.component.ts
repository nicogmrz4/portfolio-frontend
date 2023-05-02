import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() inputValue: String = "";
  @Output() inputValueChange = new EventEmitter<String>();
  @Input() label: String = "";
  @Input() width: String = "350px";
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
