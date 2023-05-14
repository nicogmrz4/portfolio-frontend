import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() inputValue: string = "";
  @Output() inputValueChange = new EventEmitter<string>();
  @Input() label: string = "";
  @Input() width: string = "350px";
  focus: Boolean = false;
  id!: string;
  @Input() info!: string;
  @Input() error!: string;

  constructor() { }

  ngOnInit(): void {
    this.generateId();
  }

  generateId(): void {
    this.id = this.label.split(" ").join("-").toLocaleLowerCase() + "-" + Math.round((Math.random() * 10000));
  }
}
