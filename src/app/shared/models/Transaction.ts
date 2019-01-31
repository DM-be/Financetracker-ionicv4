export interface Transaction {
    amount: number;
    sendingAccountName: string;
    recievingAccountName: string;
    created: Date;
}