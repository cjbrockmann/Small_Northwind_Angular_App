import { ICustomer, IOrder, ICustomerListContainer, ISingleCustomerContainer, IBaseOrder } from './i-customer';
import { ICustomerRaw, IOrderRaw, ICustomerListContainerRaw, ISingleCustomerContainerRaw, IBaseOrderRaw } from './i-customer-raw';
import { map } from 'rxjs/operators';

export class CustomerFactory {

    fromCustomerRaw(item: ICustomerRaw): ICustomer {
        return {
            ...item
        };
    }

    fromOrderRaw(item: IBaseOrderRaw): IBaseOrder {
        return {
            ...item,
            showMyDetails: false
        }
    }

    fromCustomerListRaw(items: ICustomerRaw[]): ICustomer[] {
        return items.map(i => this.fromCustomerRaw(i));
    }

    fromOrdersListRaw(items: IBaseOrderRaw[]): IBaseOrder[] {
        return items.map(i => this.fromOrderRaw(i))
    }


    fromSingleContainerRow(container: ISingleCustomerContainerRaw): ISingleCustomerContainer {
        return {
            customer: this.fromCustomerRaw(container.customer),
            customerOrders: this.fromOrdersListRaw(container.customerOrders)
        }
    }

    fromCustomerListContainerRow(items: ICustomerListContainerRaw): ICustomerListContainer {
        return {
            customers: items.customers.map(i => this.fromCustomerRaw(i))
        }
    }

    fromCustomerListContainerRowAsList(items: ICustomerListContainerRaw): ICustomer[] {
        return items.customers.map(i => this.fromCustomerRaw(i))
    }


}





