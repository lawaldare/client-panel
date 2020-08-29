import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  password: string;
  email: string;
  loading: boolean = false;

  constructor(private auth: AuthService, private flashMsg: FlashMessagesService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.auth.register(this.email, this.password).then(res => {
      this.flashMsg.show('You are now registered and logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.loading = false;
      this.router.navigate(['/'])
    }).catch(err => {
      this.flashMsg.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
      this.loading = false;
    })
  }

}
