export interface Transaction {
  amount: number;
  operation: string; // use + or - (easier to query when showing graphs etc later, we dont do -500 but with operation '-', later we can sort on this field)
  accountName: string;
  // no recieving and sending
  // when transferring between accounts: 2 transactions are made: a negative on the sender and a positive on the reciever
  created: Date;
}
