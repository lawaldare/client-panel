import { SettingsService } from 'src/app/service/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private auth: AuthService, private router: Router, private flashMsg: FlashMessagesService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.flashMsg.show('You are now logout', {
      cssClass: 'alert-success', timeout: 4000
    })
  }

}
