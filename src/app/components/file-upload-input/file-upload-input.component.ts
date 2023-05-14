import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload-input',
  templateUrl: './file-upload-input.component.html',
  styleUrls: ['./file-upload-input.component.css']
})
export class FileUploadInputComponent implements OnInit {
  url: string | ArrayBuffer | null = '';
  @Output() onSelectFile: EventEmitter<File> = new EventEmitter<File>(); 
  id!: string;
  @Input() accept!: String;

  constructor() { }

  ngOnInit(): void {
    this.generateId();
  }

  generateId(): void {
    this.id = "file-input" + Math.round((Math.random() * 10000));
  }
  
  selectFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target!.result;
      };

      let file = e.target.files[0];
      this.onSelectFile.emit(file);
    }
}
}
