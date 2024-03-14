export interface Expense {
    _id?: any;
    itemName: string;
    itemDescription: string;
    itemCost: number;
    itemCategory: any;
    paymentMode: number;
    shopDetails: {
        shopName: string;
        shopAddress: string
    };
    userId:any;
}