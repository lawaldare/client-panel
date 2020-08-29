import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }


  disableBalanceOnEdit: boolean;

  constructor(private cs: ClientService, private router: Router, private route: ActivatedRoute, private fm: FlashMessagesService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.cs.getClient(this.id).subscribe(data => {
        this.client = data;
      })
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }) {
    if (!valid) {
      this.fm.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      value.id = this.id;
      this.cs.updateClient(value);
      this.router.navigate(['/'])
      this.fm.show('Client Updated', {
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate(['/client/' + this.id]);
    }

  }

}
