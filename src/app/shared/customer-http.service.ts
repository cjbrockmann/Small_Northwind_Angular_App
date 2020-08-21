import { Injectable, OnInit } from '@angular/core';
import { ICustomerListContainer, ISingleCustomerContainer, ICustomer } from '../models/i-customer';
import { ICustomerListContainerRaw, ISingleCustomerContainerRaw } from '../models/i-customer-raw';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerFactory } from '../models/customer-factory';
import { share, map, retry, catchError } from 'rxjs/operators';



// extends INorthwindHttp<ICustomer, ICustomerRawNeu> 

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpService implements OnInit {

  private apiUrl2 = 'http://northwind.netcore.io';
  private apiUrlPostFix2 = '.json';


  factory = new CustomerFactory();


  public setGlobalPath2(path: string) {
    this.pathGetAll2 = path;
    this.pathGetSingle2 = path;
  }
  public pathGetAll2: string;
  public pathGetSingle2: string;

  constructor(private httpClient: HttpClient) {
    this.setGlobalPath2('customers');
  }

  ngOnInit(): void {

  }

  // getAll(): Observable<ICustomer[]> { return super.getAll(); }

  /*
  getAllFromContainer(containername: string): Observable<ICustomer[]> {
    return super.getAllFromContainer<ICustomerContainerRaw>(containername);
  } */

  getAllNeu(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomerListContainerRaw>(`${this.apiUrl2}/${this.pathGetAll2}`)
      .pipe(
        retry(3),
        map(obj => this.factory.fromCustomerListContainerRowAsList(obj))
        // catchError(console.log(error))
      );
  }


  getSingleNeu(id: string): Observable<ISingleCustomerContainer> {
    return this.httpClient.get<ISingleCustomerContainerRaw>(`${this.apiUrl2}/${this.pathGetSingle2}/${id}${this.apiUrlPostFix2}`)
      .pipe(
        retry(3),
        map(b => this.factory.fromSingleContainerRow(b)),
        // catchError(console.log(error))
      );
  }



  removeSingle(id: string): Observable<string> {
    return this.httpClient.delete(
      `${this.apiUrl2}/${this.pathGetSingle2}/${id}${this.apiUrlPostFix2}`
      , { responseType: 'text' })
      .pipe(
        retry(2),
        // catchError(this.errorHandler) ??? 
      );
  }

  createSingle(cust: ISingleCustomerContainer): Observable<string> {
    return this.httpClient.post(
      `${this.apiUrl2}/${this.pathGetSingle2}/${cust.customer.id}${this.apiUrlPostFix2}`
      , cust, { responseType: 'text' }
    );
  }

  updateSingle(cust: ISingleCustomerContainer): Observable<string> {
    return this.httpClient.put(
      `${this.apiUrl2}/${this.pathGetSingle2}/${cust.customer.id}${this.apiUrlPostFix2}`
      , cust, { responseType: 'text' }
    );
  }




}
