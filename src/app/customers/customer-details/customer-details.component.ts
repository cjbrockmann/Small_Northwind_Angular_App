import { Component, OnInit, Input } from '@angular/core';
import { CustomerHttpService } from 'src/app/shared/customer-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICustomer, IOrder, ISingleCustomerContainer } from 'src/app/models/i-customer';
import { IBaseOrderRaw } from 'src/app/models/i-customer-raw';


type ViewStateValues = 'details' | 'edit' | ''


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'
  ]
})
export class CustomerDetailsComponent implements OnInit {



  myViewState: ViewStateValues;


  public customerIsEditable: boolean;
  public customerDetailsEditable: boolean;
  public customerButtonTextEdit: string;
  public customerButtonTextEditClass: string;

  toggleCustomerIsEditable() {
    if (this.customerIsEditable != true) {
      this.customerIsEditable = true;
      this.customerButtonTextEditClass = 'btn-info';
      this.customerButtonTextEdit = 'Detailansicht';
    }
    else {
      this.customerIsEditable = false;
      this.customerButtonTextEditClass = 'btn-warning';
      this.customerButtonTextEdit = 'Editieren';
    }
  }

  setViewOnStart() {
    if (this.myViewState == 'edit') {
      this.customerIsEditable = true;
      this.customerDetailsEditable = false;
      this.customerButtonTextEdit = 'Detailansicht';
      this.customerButtonTextEditClass = 'btn-info';
    } else {
      this.myViewState = 'details';
      this.customerIsEditable = false;
      this.customerDetailsEditable = false;
      this.customerButtonTextEdit = 'Editieren';
      this.customerButtonTextEditClass = 'btn-warning';
    }
  }


  constructor(private myService: CustomerHttpService, private route: ActivatedRoute) {

  }


  container: ISingleCustomerContainer;

  private selectedId = '';
  public message = '';

  ngOnInit(): void {

    this.selectedId = this.route.snapshot.paramMap.get('id');
    console.log('CustomerID -> ' + this.selectedId);

    this.getCustomer(this.selectedId);

    let view = this.route.snapshot.queryParamMap.get('viewstate') || 'details';;
    if (view == 'edit') {
      this.myViewState = 'edit';
      this.customerIsEditable = true;
    } else {
      this.myViewState = 'details';
      this.customerIsEditable = false;
    }
    this.setViewOnStart();



  }

  getRowSpanOfButton(orderBase: IBaseOrderRaw) {
    let rs = 1
    if (orderBase.showMyDetails == false) {
      rs = 1;
    } else {
      rs = 2;
    }
    return rs;
  }



  getCustomer(id: string): void {
    const httpGet$ = this.myService.getSingleNeu(id);
    let tcustomer: ICustomer;
    httpGet$.subscribe({
      next: response => {
        this.container = response;
        console.log("customer found ", this.container);
        console.log("Orders", response.customerOrders)
      }
    });
  }


}
