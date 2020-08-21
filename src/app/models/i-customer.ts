export interface ICustomer {
    id: string,
    companyName: string,
    contactName?: string,
    contactTitle?: string,
    country?: string,
    region?: string,
    postalCode?: string,
    city?: string,
    address?: string,
    phone?: string,
    fax?: string
}


export interface IOrder {
    id: number,
    customerId?: string,
    employeeId?: number,
    orderDate?: Date,
    requiredDate?: Date,
    shippedDate?: Date,
    shipVia?: number,
    freight?: number,
    shipName?: string,
    shipAddress?: string,
    shipCity?: string,
    shipRegion?: string,
    shipPostalCode?: string,
    shipCountry?: string
}


export interface IOrderDetails {
    orderId: number,
    productId: number,
    unitPrice: number,
    quantity: number,
    discount: number
}


export interface IBaseOrder {
    order: IOrder,
    orderDetails: IOrderDetails[],
    showMyDetails: boolean
}

export interface ICustomerListContainer {
    customers: ICustomer[]
}

export interface ISingleCustomerContainer {
    customer: ICustomer,
    customerOrders: IBaseOrder[]
}

