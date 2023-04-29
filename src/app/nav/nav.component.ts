import { Component, OnInit, OnChanges } from '@angular/core';
import { faFacebookF , faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faFacebookF = faFacebookF;
  faLinkedin = faLinkedinIn;
  faTwitter = faTwitter;
  hiddenModalLogin: Boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.hiddenModalLogin = false;
  }

}
