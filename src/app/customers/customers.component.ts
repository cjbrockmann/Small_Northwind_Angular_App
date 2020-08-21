import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../models/i-customer';
import { CustomerHttpService } from '../shared/customer-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private myService: CustomerHttpService, private router: Router) { }
  customers: ICustomer[];

  ngOnInit(): void {
    this.getCustomersAll();
  }

  getCustomersAll(): void {
    const httpGet$ = this.myService.getAllNeu();

    httpGet$.subscribe({ next: response => { this.customers = response; } });
  }

}
