import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { response } from 'src/app/interfaces/response';
import { user } from 'src/app/interfaces/user';
import { userModel } from 'src/app/models/userMode';
import { UserService } from 'src/app/services/user.service';
import { fileToBase64 } from 'src/app/utils/fileToBase64';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() hidden: Boolean = true;
  @Output() hiddenChange = new EventEmitter<Boolean>();
  @Output() onUploadProfile = new EventEmitter<string | ArrayBuffer | null | undefined>();
  @Output() onUploadBackground = new EventEmitter<string | ArrayBuffer | null | undefined>();
  @Input() currentData: user = Object.assign({}, userModel);
  title = 'Editar perfil';
  image: File | null = null;
  profilePreview!: string | ArrayBuffer | null | undefined;
  backgroundPreview!: string | ArrayBuffer | null | undefined;
  profileFile: File | null = null;
  backgroundFile: File | null = null;
  inputFileValue!: string;
  mediaUrl: string = env.mediaUrl

  constructor(private service: UserService) {}

  ngOnInit(): void {}

  onOpen(): void {
      this.resetFile();
      this.hiddenChange.emit(false);
  }

  onClose(): void {
      this.hiddenChange.emit(true);
  }

  onSubmit() {
    if (!!this.profileFile) {
      this.uploadUserProfile(this.profileFile)
    }
    if (!!this.backgroundFile) {
      this.uploadUserBackground(this.backgroundFile);
    }

    this.onClose();
  }

  uploadUserProfile(profile: File) {
      this.service.uploadProfile(profile).subscribe({
          next: (res: HttpResponse<response<user>>) => {
              if (res.status == 200) {
                  this.onUploadProfile.emit(this.profilePreview);
              }
          },
      });
  }

  uploadUserBackground(background: File) {
      this.service.uploadBackground(background).subscribe({
          next: (res: HttpResponse<response<user>>) => {
              if (res.status == 200) {
                  this.onUploadBackground.emit(this.backgroundPreview);
              }
          },
      });
  }

  onSelectProfile(profile: File) {
      this.profileFile = profile;
      fileToBase64(profile).onload = (e) => {
          this.profilePreview = e.target?.result;
      }
  }

  onSelectBackground(background: File) {
      this.backgroundFile = background;
      fileToBase64(background).onload = (e) => {
          this.backgroundPreview = e.target?.result;
      }
  }

  resetFile() {
      this.profileFile = null;
      this.profilePreview = null;
      this.backgroundFile = null;
      this.backgroundPreview = null;
  }
}
