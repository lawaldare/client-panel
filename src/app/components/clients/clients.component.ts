import { Client } from './../../models/client';
import { ClientService } from './../../service/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {

      this.clients = data;;
      this.getTotalOwed()
      console.log(this.clients);


    })
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((a, b) => {
      return a + +b.balance
    }, 0);
  }

}
