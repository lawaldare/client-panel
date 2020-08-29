import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string;
  email: string;
  loading: boolean = false;

  constructor(private auth: AuthService, private flashMsg: FlashMessagesService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }
    })
  }


  onSubmit() {
    this.loading = true;
    this.auth.login(this.email, this.password).then(response => {
      this.flashMsg.show('You are now logged in', {
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/']);
      this.loading = false;
    }).catch(err => {
      this.flashMsg.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      })
      this.loading = false;
    })
  }

}
