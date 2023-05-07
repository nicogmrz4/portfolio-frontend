import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { experience } from 'src/app/interfaces/experience';
import { response } from 'src/app/interfaces/response';
import { experienceModel } from 'src/app/models/experienceModel';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
    selector: 'app-experience-modal',
    templateUrl: './experience-modal.component.html',
    styleUrls: ['./experience-modal.component.css'],
})
export class ExperienceModalComponent implements OnInit, OnChanges {
    @Input() hidden: Boolean = true;
    @Output() hiddenChange = new EventEmitter<Boolean>();
    @Output() onNewExperience = new EventEmitter<experience>();
    @Output() onEditExperience = new EventEmitter<experience>();
    @Input() currentData: experience = Object.assign({}, experienceModel);
    title = '';

    constructor(private service: ExperienceService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentData'].currentValue.id != null) {
            console.log("Editar")
            this.title = 'Editar experiencia';
        } else {
            console.log("Añadir")
            this.title = 'Añadir experiencia';
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
        if (this.currentData.id != null) this.editExperience(this.currentData.id, this.currentData);
        else this.newExperience();
    }

    newExperience() {
        this.service
            .createExperience(this.currentData)
            .subscribe((res: HttpResponse<response<experience>>) => {
                if (res.status == 201) {
                    const newExperience = res.body?.data[0];
                    this.onNewExperience.emit(newExperience);
                }
            });
    }

    editExperience(id: any, data: experience) {
        this.service
            .editExperience(id, data)
            .subscribe((res: HttpResponse<response<experience>>) => {
              if (res.status == 200) {
                const editedExperience = res.body?.data[0];
                this.onEditExperience.emit(editedExperience);
              }
            });
    }
}
