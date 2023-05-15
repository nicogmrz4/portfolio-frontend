import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { projectErr } from 'src/app/interfaces/errors/projectErr';
import { project } from 'src/app/interfaces/project';
import { response } from 'src/app/interfaces/response';
import { projectErrModel } from 'src/app/models/errors/projectErrModel';
import { projectModel } from 'src/app/models/projectModel';
import { ProjectService } from 'src/app/services/project.service';
import { fileToBase64 } from 'src/app/utils/fileToBase64';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-project-modal',
    templateUrl: './project-modal.component.html',
    styleUrls: ['./project-modal.component.css'],
})
export class ProjectModalComponent implements OnInit {
    @Input() hidden: Boolean = true;
    @Output() hiddenChange = new EventEmitter<Boolean>();
    @Output() onNewProject = new EventEmitter<project>();
    @Output() onEditProject = new EventEmitter<project>();
    @Input() currentData: project = Object.assign({}, projectModel);
    title = '';
    errors: projectErr = Object.assign({}, projectErrModel);
    image: File | null = null;
    imagePreview!: string | ArrayBuffer | null | undefined;
    inputFileValue!: string;
    mediaUrl: string = env.mediaUrl;
    loading: Boolean = false;


    constructor(private service: ProjectService) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.currentData.id != null) {
            this.title = 'Editar educación';
        } else {
            this.title = 'Añadir educación';
        }
    }

    onOpen(): void {
        this.resetFile();
        this.hiddenChange.emit(false);
    }

    onClose(): void {
        this.hiddenChange.emit(true);
        this.errors = Object.assign({}, projectErrModel);
    }

    onSubmit() {
        this.loading = true;
        // if id isn't null a item is edited, then make a PUT request
        if (this.currentData.id != null)
            this.editProject(this.currentData.id, this.currentData, this.image);
        else this.newProject(this.image);
    }

    newProject(image: File | null) {
        this.service.createProject(this.currentData).subscribe({
            next: (res: HttpResponse<response<project>>) => {
                if (res.status == 201 && image != null) {
                    const newProject = res.body?.data[0];
                    this.onNewUploadProjectImage(newProject?.id, image);
                } else if (res.status == 201) {
                    const newProject = res.body?.data[0];
                    this.onNewProject.emit(newProject);
                    this.loading = false;
                }
            },
            error: (resErr: HttpErrorResponse) => {
                this.errors = Object.assign({}, projectErrModel);
                this.errors = Object.assign(this.errors, resErr.error.errors);
                this.loading = false;
            },
        });
    }

    editProject(id: any, data: project, image: File | null) {
        this.service.editProject(id, data).subscribe({
            next: (res: HttpResponse<response<project>>) => {
                if (res.status == 200 && image != null) {
                    this.onEditUploadProjectImage(id, image);
                } else if (res.status == 200) {
                    const editedProject = res.body?.data[0];
                    this.onEditProject.emit(editedProject);
                    this.loading = false;
                }
            },
            error: (resErr: HttpErrorResponse) => {
                this.errors = Object.assign({}, projectErrModel);
                this.errors = Object.assign(this.errors, resErr.error.errors);
                this.loading = false;
            },
        });
    }

    
    onNewUploadProjectImage(id: any, image: File) {
        this.service.uploadProjectImage(id, image).subscribe({
            next: (res: HttpResponse<response<project>>) => {
                if (res.status == 200) {
                    const editedProject = res.body?.data[0];
                    this.onNewProject.emit(editedProject);
                }
                this.loading = false;
            },
        });
    }

    onEditUploadProjectImage(id: any, image: File) {
        this.service.uploadProjectImage(id, image).subscribe({
            next: (res: HttpResponse<response<project>>) => {
                if (res.status == 200) {
                    const editedProject = res.body?.data[0];
                    this.onEditProject.emit(editedProject);
                }
                this.loading = false;
            },
        });
    }

    onSelectFile(image: File) {
        this.image = image;
        fileToBase64(image).onload = (e) => {
            this.imagePreview = e.target?.result;
        }
    }

    resetFile() {
        this.imagePreview = null;
        this.image = null;
    }
}
