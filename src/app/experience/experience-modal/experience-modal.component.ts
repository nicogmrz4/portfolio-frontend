import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { experienceErr } from 'src/app/interfaces/errors/experienceErr';
import { experience } from 'src/app/interfaces/experience';
import { response } from 'src/app/interfaces/response';
import { experienceErrModel } from 'src/app/models/errors/experienceErrModel';
import { experienceModel } from 'src/app/models/experienceModel';
import { ExperienceService } from 'src/app/services/experience.service';
import { fileToBase64 } from 'src/app/utils/fileToBase64';
import { environment as env } from 'src/environments/environment';

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
    errors: experienceErr = Object.assign({}, experienceErrModel);
    logo: File | null = null;
    logoPreview!: string | ArrayBuffer | null | undefined;
    inputFileValue!: string;
    mediaUrl: string = env.mediaUrl
    loading: Boolean = false;


    constructor(private service: ExperienceService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.currentData.id != null) {
            console.log('Editar');
            this.title = 'Editar experiencia';
        } else {
            console.log('Añadir');
            this.title = 'Añadir experiencia';
        }
    }

    onOpen(): void {
        this.resetFile();
        this.hiddenChange.emit(false);
    }

    onClose(): void {
        this.hiddenChange.emit(true);
        this.errors = Object.assign({}, experienceErrModel);
    }

    onSubmit() {
        // if id isn't null a item is edited, then make a PUT request
        this.loading = true;
        if (this.currentData.id != null)
            this.editExperience(this.currentData.id, this.currentData);
        else this.newExperience();
    }

    newExperience() {
        this.service.createExperience(this.currentData).subscribe({
            next: (res: HttpResponse<response<experience>>) => {
                if (res.status == 201 && this.logo != null) {
                    const newExperience = res.body?.data[0];
                    this.onNewUploadExperienceLogo(newExperience?.id, this.logo);
                } else if(res.status == 201) {
                    const newExperience = res.body?.data[0];
                    this.onNewExperience.emit(newExperience);
                    this.loading = false;
                }
            },
            error: (errRes: HttpErrorResponse) => {
                this.errors = Object.assign({}, experienceErrModel);
                this.errors = Object.assign(this.errors, errRes.error.errors);
                this.loading = false;
            },
        });
    }

    editExperience(id: any, data: experience) {
        this.service.editExperience(id, data).subscribe({
            next: (res: HttpResponse<response<experience>>) => {
                if (res.status == 200 && this.logo != null) {
                    this.onEditUploadExperienceLogo(id, this.logo)
                } else if(res.status == 200) {
                    const editedExperience = res.body?.data[0];
                    this.onEditExperience.emit(editedExperience);
                    this.loading = false;
                }
            },
            error: (errRes: HttpErrorResponse) => {
                this.errors = Object.assign({}, experienceErrModel);
                this.errors = Object.assign(this.errors, errRes.error.errors);
                this.loading = false;
            },
        });
    }

    onNewUploadExperienceLogo(id: any, logo: File) {
        this.service.uploadExperienceLogo(id, logo).subscribe({
            next: (res: HttpResponse<response<experience>>) => {
                if (res.status == 200) {
                    const editedExperience = res.body?.data[0];
                    this.onNewExperience.emit(editedExperience);
                }
                this.loading = false;
            },
        });
    }

    onEditUploadExperienceLogo(id: any, logo: File) {
        this.service.uploadExperienceLogo(id, logo).subscribe({
            next: (res: HttpResponse<response<experience>>) => {
                if (res.status == 200) {
                    const editedExperience = res.body?.data[0];
                    this.onEditExperience.emit(editedExperience);
                }
                this.loading = false;
            },
        });
    }

    onSelectFile(logo: File) {
        this.logo = logo;
        fileToBase64(logo).onload = (e) => {
            this.logoPreview = e.target?.result;
        }
    }

    resetFile() {
        this.logoPreview = null;
        this.logo = null;
    }
}
