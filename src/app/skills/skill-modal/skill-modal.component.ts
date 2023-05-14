import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { skillErr } from 'src/app/interfaces/errors/skillErr';
import { response } from 'src/app/interfaces/response';
import { skill } from 'src/app/interfaces/skill';
import { skillErrModel } from 'src/app/models/errors/skillErrModel';
import { skillModel } from 'src/app/models/skillModel';
import { SkillService } from 'src/app/services/skill.service';
import { fileToBase64 } from 'src/app/utils/fileToBase64';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-skill-modal',
    templateUrl: './skill-modal.component.html',
    styleUrls: ['./skill-modal.component.css'],
})
export class SkillModalComponent implements OnInit {
    @Input() hidden: Boolean = true;
    @Output() hiddenChange = new EventEmitter<Boolean>();
    @Output() onNewSkill = new EventEmitter<skill>();
    @Output() onEditSkill = new EventEmitter<skill>();
    @Input() currentData: skill = Object.assign({}, skillModel);
    title = '';
    errors: skillErr = Object.assign({}, skillErrModel);
    icon: File | null = null;
    iconPreview!: string | ArrayBuffer | null | undefined;
    inputFileValue!: string;
    mediaUrl: string = env.mediaUrl

    constructor(private service: SkillService) {}

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
        this.resetFile();
        this.hiddenChange.emit(false);
    }

    onClose(): void {
        this.hiddenChange.emit(true);
        this.errors = Object.assign({}, skillErrModel);
    }

    onSubmit() {
        // if id isn't null a item is edited, then make a PUT request
        if (this.currentData.id != null)
            this.editSkill(this.currentData.id, this.currentData);
        else this.newSkill();
    }

    newSkill() {
        this.service.createSkill(this.currentData).subscribe({
            next: (res: HttpResponse<response<skill>>) => {
                if (res.status == 201 && this.icon != null) {
                    const newSkill = res.body?.data[0];
                    this.onNewUploadSkillLogo(newSkill?.id, this.icon);
                } else if(res.status == 201) {
                    const newSkill = res.body?.data[0];
                    this.onNewSkill.emit(newSkill);
                }
            },
            error: (res: HttpErrorResponse) => {
                this.errors = Object.assign({}, skillErrModel);
                this.errors = Object.assign(this.errors, res.error.errors);
            },
        });
    }

    editSkill(id: any, data: skill) {
        this.service.editSkill(id, data).subscribe({
            next: (res: HttpResponse<response<skill>>) => {
                if (res.status == 200 && this.icon != null) {
                    this.onEditUploadSkillLogo(id, this.icon)
                } else if(res.status == 200) {
                    const editedSkill = res.body?.data[0];
                    this.onEditSkill.emit(editedSkill);
                }
            },
            error: (res: HttpErrorResponse) => {
                this.errors = Object.assign({}, skillErrModel);
                this.errors = Object.assign(this.errors, res.error.errors);
            },
        });
    }

    
    onNewUploadSkillLogo(id: any, icon: File) {
        console.log(id, icon);
        this.service.uploadSkillIcon(id, icon).subscribe({
            next: (res: HttpResponse<response<skill>>) => {
                console.log("Ok");
                if (res.status == 200) {
                    const editedSkill = res.body?.data[0];
                    this.onNewSkill.emit(editedSkill);
                }
            },
        });
    }

    onEditUploadSkillLogo(id: any, icon: File) {
        this.service.uploadSkillIcon(id, icon).subscribe({
            next: (res: HttpResponse<response<skill>>) => {
                if (res.status == 200) {
                    const editedSkill = res.body?.data[0];
                    this.onEditSkill.emit(editedSkill);
                }
            },
        });
    }

    onSelectFile(icon: File) {
        this.icon = icon;
        fileToBase64(icon).onload = (e) => {
            this.iconPreview = e.target?.result;
        }
    }

    resetFile() {
        this.iconPreview = null;
        this.icon = null;
    }
}
