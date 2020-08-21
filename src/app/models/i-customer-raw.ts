export interface ICustomerRaw {
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


export interface IOrderRaw {
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

export interface IOrderDetailsRaw {
    orderId: number,
    productId: number,
    unitPrice: number,
    quantity: number,
    discount: number
}


export interface IBaseOrderRaw {
    order: IOrderRaw,
    orderDetails: IOrderDetailsRaw[],
    showMyDetails: boolean
}

export interface ICustomerListContainerRaw {
    customers: ICustomerRaw[]
}

export interface ISingleCustomerContainerRaw {
    customer: ICustomerRaw,
    customerOrders: IBaseOrderRaw[]
}




