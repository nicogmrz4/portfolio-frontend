import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { response } from 'src/app/interfaces/response';
import { skill } from 'src/app/interfaces/skill';
import { skillModel } from 'src/app/models/skillModel';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-modal',
  templateUrl: './skill-modal.component.html',
  styleUrls: ['./skill-modal.component.css']
})
export class SkillModalComponent implements OnInit {
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  @Output() onNewSkill = new EventEmitter<skill>();
  @Output() onEditSkill = new EventEmitter<skill>();
  @Input() currentData: skill = Object.assign({}, skillModel);
  title = '';

  constructor(private service: SkillService) {}

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
      if (this.currentData.id != null) this.editSkill(this.currentData.id, this.currentData);
      else this.newSkill();
  }

  newSkill() {
      this.service
          .createSkill(this.currentData)
          .subscribe((res: HttpResponse<response<skill>>) => {
              if (res.status == 201) {
                  const newSkill = res.body?.data[0];
                  this.onNewSkill.emit(newSkill);
              }
          });
  }

  editSkill(id: any, data: skill) {
      this.service
          .editSkill(id, data)
          .subscribe((res: HttpResponse<response<skill>>) => {
            if (res.status == 200) {
              const editedSkill = res.body?.data[0];
              this.onEditSkill.emit(editedSkill);
            }
          });
  }
}
