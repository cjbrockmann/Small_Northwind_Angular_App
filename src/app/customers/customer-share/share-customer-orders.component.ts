import { Component, OnInit, Input } from '@angular/core';
import { IBaseOrder } from 'src/app/models/i-customer';
import { IBaseOrderRaw } from 'src/app/models/i-customer-raw';

@Component({
  selector: 'app-share-customer-orders',
  templateUrl: './share-customer-orders.component.html',
  styles: [
  ]
})
export class ShareCustomerOrdersComponent implements OnInit {

  @Input() customerOrders: IBaseOrder;

  constructor() { }

  ngOnInit(): void {
  }



  toggleVisibility(orderBase: IBaseOrder): void {
    if (orderBase.showMyDetails == false) {
      orderBase.showMyDetails = true;
    } else {
      orderBase.showMyDetails = false;
    }
  }

}
