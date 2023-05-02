import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() inputValue: String = "";
  @Output() inputValueChange: EventEmitter<String> = new EventEmitter<String>();
  @Input() label: String = "";
  focus: Boolean = false;
  id!: String;
  @Input() width: String = "350px";
  @Input() minLen: number|null = null; 
  @Input() maxLen: number|null = null; 
  @Input() required: Boolean = false;
  isValid: boolean = true;
  @Output() isValidChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  message: string = "";

  constructor() { }

  ngOnInit(): void {
    this.generateId();
  }

  generateId(): void {
    this.id = this.label.split(" ").join("-").toLocaleLowerCase() + "-" + Math.round((Math.random() * 10000));
  }

  onChanges() {
    this.inputValueChange.emit(this.inputValue);
    this.validate();
  }

  validate() {
    if (this.minLen != null && this.inputValue.length < this.minLen) {
      this.isValid = false;
      this.isValidChange.emit(false);
      this.message = `Debe introducir ${this.minLen} o más caracteres.`

      return;
    }
    
    if (this.maxLen != null && this.inputValue.length > this.maxLen) {
      this.isValid = false;
      this.isValidChange.emit(false);
      this.message = `Debe introducir ${this.maxLen} o menos caracteres.`
      
      return;
    }

    this.isValid = true;
    this.isValidChange.emit(true);
  }
}
