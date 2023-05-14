import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { education } from 'src/app/interfaces/education';
import { educationErr } from 'src/app/interfaces/errors/educationErr';
import { response } from 'src/app/interfaces/response';
import { educationModel } from 'src/app/models/educationModel';
import { educationErrModel } from 'src/app/models/errors/educationErrModel';
import { EducationService } from 'src/app/services/education.service';

@Component({
    selector: 'app-education-modal',
    templateUrl: './education-modal.component.html',
    styleUrls: ['./education-modal.component.css'],
})
export class EducationModalComponent implements OnInit {
    @Input() hidden: Boolean = true;
    @Output() hiddenChange = new EventEmitter<Boolean>();
    @Output() onNewEducation = new EventEmitter<education>();
    @Output() onEditEducation = new EventEmitter<education>();
    @Input() currentData: education = Object.assign({}, educationModel);
    title = '';
    errors: educationErr = Object.assign({}, educationErrModel);
    logo: File | null = null;

    constructor(private service: EducationService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.currentData.id != null) {
            console.log('Editar');
            this.title = 'Editar educación';
        } else {
            console.log('Añadir');
            this.title = 'Añadir educación';
        }
    }

    onOpen(): void {
        this.hiddenChange.emit(false);
    }

    onClose(): void {
        this.hiddenChange.emit(true);
        this.errors = Object.assign({}, educationErrModel);
    }

    onSubmit() {
        // if id isn't null a item is edited, then make a PUT request
        if (this.currentData.id != null)
            this.editEducation(this.currentData.id, this.currentData);
        else this.newEducation();
    }

    newEducation() {
        this.service.createEducation(this.currentData).subscribe({
            next: (res: HttpResponse<response<education>>) => {
                if (res.status == 201 && this.logo != null) {
                    const newEducation = res.body?.data[0];
                    this.onNewUploadEducationLogo(newEducation?.id, this.logo);
                } else if(res.status == 201) {
                    const editedEducation = res.body?.data[0];
                    this.onNewEducation.emit(editedEducation);
                }
            },
            error: (errRes: HttpErrorResponse) => {
                this.errors = Object.assign({}, educationErrModel);
                this.errors = Object.assign(this.errors, errRes.error.errors);
            },
        });
    }

    editEducation(id: any, data: education) {
        this.service.editEducation(id, data).subscribe({
            next: (res: HttpResponse<response<education>>) => {
                if (res.status == 200 && this.logo != null) {
                    this.onEditUploadEducationLogo(id, this.logo)
                } else if(res.status == 200) {
                    const editedExperience = res.body?.data[0];
                    this.onEditEducation.emit(editedExperience);
                }
            },
            error: (errRes: HttpErrorResponse) => {
                this.errors = Object.assign({}, educationErrModel);
                this.errors = Object.assign(this.errors, errRes.error.errors);
            },
        });
    }

    onNewUploadEducationLogo(id: any, logo: File) {
        console.log(id, logo);
        this.service.uploadEducationLogo(id, logo).subscribe({
            next: (res: HttpResponse<response<education>>) => {
                console.log("Ok");
                if (res.status == 200) {
                    const editedEducation = res.body?.data[0];
                    this.onNewEducation.emit(editedEducation);
                }
            },
        });
    }

    onEditUploadEducationLogo(id: any, logo: File) {
        this.service.uploadEducationLogo(id, logo).subscribe({
            next: (res: HttpResponse<response<education>>) => {
                if (res.status == 200) {
                    const editedEducation = res.body?.data[0];
                    this.onEditEducation.emit(editedEducation);
                }
            },
        });
    }

    onSelectFile(logo: File) {
        this.logo = logo;
    }
}
