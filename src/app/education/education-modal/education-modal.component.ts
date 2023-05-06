import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { education } from 'src/app/interfaces/education';
import { response } from 'src/app/interfaces/response';
import { educationModel } from 'src/app/models/educationModel';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css']
})
export class EducationModalComponent implements OnInit {

  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  @Output() onNewEducation = new EventEmitter<education>();
  @Output() onEditEducation = new EventEmitter<education>();
  @Input() currentData: education = Object.assign({}, educationModel);
  title = '';

  constructor(private service: EducationService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['currentData'].currentValue.id != null) {
          console.log("Editar")
          this.title = 'Editar educación';
      } else {
          console.log("Añadir")
          this.title = 'Añadir educación';
      }
  }

  onOpen(): void {
      this.hiddenChange.emit(false);
  }

  onClose(): void {
      this.hiddenChange.emit(true);
  }

  onSubmit() {
      // if id isn't null a item is edited, then make a PUT request
      if (this.currentData.id != null) this.editEducation(this.currentData.id, this.currentData);
      else this.newEducation();
  }

  newEducation() {
      this.service
          .createEducation(this.currentData)
          .subscribe((res: HttpResponse<response<education>>) => {
              if (res.status == 201) {
                  const newEducation = res.body?.data[0];
                  this.onNewEducation.emit(newEducation);
              }
          });
  }

  editEducation(id: any, data: education) {
      this.service
          .editEducation(id, data)
          .subscribe((res: HttpResponse<response<education>>) => {
            if (res.status == 200) {
              const editedEducation = res.body?.data[0];
              this.onEditEducation.emit(editedEducation);
            }
          });
  }
}
