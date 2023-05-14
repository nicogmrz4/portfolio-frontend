import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css']
})
export class BtnComponent implements OnInit {
  @Input() text: string = 'Button';
  @Input() danger: Boolean = false;
  @Input() block: Boolean = false;
  @Input() type: 'text' | 'submit' | 'reset' = 'text';
  constructor() { }

  ngOnInit(): void {
  }

}
