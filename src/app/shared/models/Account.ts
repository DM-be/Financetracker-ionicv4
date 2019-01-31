export interface Account {
    owner: string;
    accountName: string;
    balance: string;
    accountIcon: string;
    created: Date;
    initialBalanceInSelectedMonth?: number; // the final balance of the previous month
    currentBalanceInSelectedMonth?: number;
    // show this field if the selectedmonth is not the current month (calculate it based off transactions + expenses)
}

