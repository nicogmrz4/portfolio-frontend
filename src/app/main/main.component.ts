import { Component, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { user } from '../interfaces/user';
import { userModel } from '../models/userMode';
import { response } from '../interfaces/response';
import { environment as env } from 'src/environments/environment';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    faPen = faPen;
    user: user = Object.assign({}, userModel);
    hiddenUserModal: Boolean = true;
    mediaUrl: string = env.mediaUrl
    auxProfile!: any;
    auxBackground!: any;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadProfileAndBackground();
    }

    loadProfileAndBackground() {
        this.userService.getUser().subscribe({
            next: (res: response<user>) => {
              this.user = res.data[0];
            },
        });
    }

    changeProfile(profile: any) {
        console.log(profile);
        this.auxProfile = profile;
    }

    changeBackground(background: any) {
        this.auxBackground = background;
    }
}
