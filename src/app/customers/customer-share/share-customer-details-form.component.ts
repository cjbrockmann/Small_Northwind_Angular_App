import { Component, OnInit, Input, Output } from '@angular/core';
import { ICustomer, ISingleCustomerContainer } from '../../models/i-customer';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CustomerHttpService } from '../../shared/customer-http.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// Trick 17!!! 
type FormElement = FormArray | FormGroup | FormControl;


@Component({
  selector: 'app-share-customer-details-form',
  templateUrl: './share-customer-details-form.component.html',
  styles: [
    'form { margin: 0 0 0 0; }'
  ]
})
export class ShareCustomerDetailsFormComponent implements OnInit {

  private customer: ICustomer;
  public message: string;
  public color: string;


  @Input()
  public set setCustomer(cust) {
    this.customer = cust;
    if (this.formBuilder) {

      this.myForm = this.formBuilder.group(this.customer);

      console.log('Formular wurde erstellt', this.myForm);

      try {
        let id: string = this.myForm.get("id").value
        if (id && id.length > 0)
          this.myForm.get("id").disable();

        if (this.myForm.get("id"))
          this.myForm.get("id").setValidators([Validators.required]);
        this.myForm.get("contactName").setValidators([Validators.required, Validators.minLength(5)]);

        console.log('Validator wurde hinzugefügt', this.myForm.get("id"));
      } finally { }

    }
  }

  @Output()
  public get getCustomer(): ICustomer {
    return this.customer;
  }


  public myForm: FormGroup;

  showWarning(mssg: string): void {
    this.color = 'red';
    this.message = mssg;
    setTimeout(() => this.message = '', 4000);
  }

  showInfoText(mssg: string): void {
    this.color = 'blue';
    this.message = mssg;
    setTimeout(() => this.message = '', 4000);
  }



  constructor(
    private formBuilder: FormBuilder,
    private myService: CustomerHttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  fGet(name: string): FormElement {
    return this.myForm.get(name) as FormElement;
  }

  simulieren() {
    if (this.myForm.invalid) { return; }
    // Dies aktualisiert die Anzeige, der damit verknüpften Elemente
    this.customer = Object.assign(this.customer, this.myForm.value);
    this.showInfoText('Formularwerte links, Objekt zum Verschicken rechts...');
  }

  submit() {
    if (this.myForm.invalid) { return; }

    // Dies aktualisiert die Anzeige, der damit verknüpften Elemente
    this.customer = Object.assign(this.customer, this.myForm.value);

    // Vorbereiten zum Verschicken
    const container: ISingleCustomerContainer = { customer: this.customer, customerOrders: null };
    console.log('Submitted value', container);

    // Verschicken
    const httpUpdate$ = this.myService.updateSingle(container);
    httpUpdate$.subscribe({
      next: response => {
        this.showInfoText('Daten erfolgreich gespeichert!');
      },
      error: (x: HttpErrorResponse) => {
        this.showWarning(x.status.toString() + ' ' + x.statusText);
        // this.message = x.status.toString() + ' ' + x.statusText;
      }
    });

  }



  getCustomerHttp(id: string): void {
    const httpGet$ = this.myService.getSingleNeu(id);
    let tcustomer: ICustomer;
    httpGet$.subscribe({
      next: response => {
        this.customer = response.customer;
        console.log("customer found ", this.customer);
        console.log("Orders", response.customerOrders)
      }
    });
  }


}
