import { SettingsService } from './../../service/settings.service';
import { ClientService } from './../../service/client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }


  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(private flashMsg: FlashMessagesService, private cs: ClientService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;

  }

  saveClient({ value, valid }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMsg.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      this.cs.newClient(value);
      this.router.navigate(['/'])
      this.flashMsg.show('New Client Added', {
        cssClass: 'alert-success', timeout: 4000
      })
    }
  }

}
