import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ShareCustomerDetailsComponent } from './customer-share/share-customer-details.component';
import { ShareCustomerDetailsFormComponent } from './customer-share/share-customer-details-form.component';
import { ShareCustomerOrdersComponent } from './customer-share/share-customer-orders.component';
import { ShareCustomerOrdersFormComponent } from './customer-share/share-customer-orders-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerDetailsComponent,
    ShareCustomerDetailsComponent,
    ShareCustomerDetailsFormComponent,
    ShareCustomerOrdersComponent,
    ShareCustomerOrdersFormComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
