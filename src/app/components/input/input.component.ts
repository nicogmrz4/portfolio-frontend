import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() inputValue: string | string = "";
  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() label: string = "";
  focus: Boolean = false;
  id!: string;
  @Input() width: string = "350px";
  @Input() minLen: number|null = null; 
  @Input() maxLen: number|null = null; 
  @Input() required: Boolean = false;
  isValid: boolean = true;
  @Output() isValidChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  message: string = "";
  @Input() info!: string;
  @Input() error!: string;
  @Input() type: string = "text";

  constructor() { }

  ngOnInit(): void {
    this.generateId();
  }

  generateId(): void {
    this.id = this.label.split(" ").join("-").toLocaleLowerCase() + "-" + Math.round((Math.random() * 10000));
  }

  onChanges() {
    this.inputValueChange.emit(this.inputValue);
  }
}
