export interface Expense {
    _id?: any;
    itemName: string;
    itemDescription: string;
    itemCost: number;
    itemCategory: any;
    paymentMode: number;
    billFile: any,
    shopDetails: {
        shopName: string;
        shopAddress: string
    };
    userId:any;
}