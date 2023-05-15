import { Component, OnInit } from '@angular/core';
import { faInstagram , faGithub , faTwitter } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faInstagram = faInstagram;
  faGithub = faGithub;
  faTwitter = faTwitter;
  constructor(public authServ: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authServ.logout();
  }
}
