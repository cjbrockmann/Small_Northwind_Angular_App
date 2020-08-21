import { Component, OnInit, Input } from '@angular/core';
import { ICustomer } from '../../models/i-customer';

@Component({
  selector: 'app-share-customer-details',
  templateUrl: './share-customer-details.component.html',
  styles: [
  ]
})
export class ShareCustomerDetailsComponent implements OnInit {

  constructor() { }

  @Input()
  customer: ICustomer;

  ngOnInit(): void {
  }

}
