import { Client } from './../../models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../service/client.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(private cs: ClientService, private router: Router, private route: ActivatedRoute, private fm: FlashMessagesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.cs.getClient(this.id).subscribe(data => {
        if (data !== null) {
          if (data.balance > 0) {
            this.hasBalance = true;
          }
        }
        this.client = data;
      })
    });
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.cs.deleteClient(this.client);
      this.fm.show('Client removed!', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/'])
    }
  }

  updateBalance() {
    this.cs.updateClient(this.client);
    this.fm.show('Balance updated!', {
      cssClass: 'alert-success', timeout: 4000
    })
  }

}
